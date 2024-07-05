import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Tune as TuneIcon } from '@mui/icons-material';

import { 
	MOCK_IMAGES,
	MAX_DISTANCE_KM,
	MOCK_DESCRIPTION,
	MOCK_DEFAULT_LOCATION,
	DEFAULT_SEARCH_WEIGHTS,
} from '../../mocks';
import api from '../../api';
import { useStore } from '../../store';
import formatMessage from '../../utils/formatMessage';
import { useAccomodationFilters } from '../../utils/hooks';
import { InfoCard, BlankCard, Pagination, GoogleMap } from '../../components';
import { setWrapperClassName, setListingWrapperClassName } from './Search.controller';

const parseAccomodationInfo = (data = {}) => ({
	...data, 
	images: MOCK_IMAGES,
	isAccomodation: true, 
	description: MOCK_DESCRIPTION,
	id: (data?.id || '').toString(),
});

const SearchScreen: React.FC = () => {
	const { state } = useStore();

	const [ zoom, setZoom ] = React.useState(11);
	const [ options, setOptions ] = React.useState([]);
	const [ loading, setLoading ] = React.useState(false);
	const [ pagination, setPagination ] = React.useState({
		page: 1, limit: 5, totalItems: 0, totalPages: 0,
	});
	const [ center, setCenter ] = React.useState(MOCK_DEFAULT_LOCATION);
	const [ highlightedAccomodation, setHighlightedAccomodation ] = React.useState(null);

	const filteredOptions = useAccomodationFilters({
		referencePoint: center, 
		accommodations: options, 
		maxDistance: MAX_DISTANCE_KM,
		weights: DEFAULT_SEARCH_WEIGHTS,
	});

	const listListing = (page: number = 1) => {
		setLoading(true);

		api.listing.list({
			page: pagination.page, 
			limit: pagination.limit,
		}).then(({ data }) => {
			setPagination(data?.pagination);

			if (data?.result && data?.result.length) {
				setOptions(data?.result.map(parseAccomodationInfo));
			}

			setLoading(false);
		}).catch(() => {
			setLoading(false);
		});
	}

	const getListing = (listingId?: number) => {
		if (!listingId) return;

		setLoading(true);

		api.listing.get(listingId).then(({ data }) => {
			// setPagination(data?.pagination);

			if (data?.result && data?.result.length) {
				setOptions(data?.result.map(parseAccomodationInfo));
			}

			setLoading(false);
		}).catch(() => {
			setLoading(false);
		});
	}

	const messages = {
		searchTitle: formatMessage('screen.search.title'),
		searchSubtitle: formatMessage('screen.search.subtitle'),
		searchFilterCta: formatMessage('screen.search.filter.cta'),
		noResultTitle1: formatMessage('screen.search.no-result.title1'),
		noResultTitle2: formatMessage('screen.search.no-result.title2'),
	}

	React.useEffect(() => {
		listListing(pagination?.page);
	}, [ pagination?.page ]);

	// Update center on claim search.
	React.useEffect(() => {
		const { longitude, latitude } = state?.claim || {};

		if (center && (center.longitude !== longitude || center.latitude !== latitude)) {
			// Update center state with the new coordinates
			setCenter({ longitude, latitude });
		}
	}, [ state?.claim, center ]);

	const handlePageClick = React.useCallback((event, newPage) => {
		setPagination((prevPagination) => {
			// Prevent fetching same page.
			if (prevPagination.page === newPage) {
				return prevPagination;
			}

			// Ensure page doesn't go below 1.
			if (newPage < 1) {
				return prevPagination;
			}

			// Ensure page doesn't exceed totalPages.
			if (newPage > prevPagination.totalPages) {
				return prevPagination;
			}

			return { ...prevPagination, page: newPage };
		});
	}, [ pagination ]);

	const onIdle = (map = { getZoom: () => null, getCenter: () => null }) => {
		setZoom(map?.getZoom());
		const nextCenter = map?.getCenter();
		if (nextCenter) {
			setCenter(nextCenter.toJSON());
		}
	};

	const onMarkerClick = React.useCallback((payload) => {
		if (highlightedAccomodation === payload) {
			setHighlightedAccomodation(null);
		} else {
			setHighlightedAccomodation(payload);
			getListing(payload?.id);
		}
	}, [ highlightedAccomodation ]);

	const memoizedMarkers = React.useMemo(() => {
		const { longitude, latitude } = state?.claim;

		let res = [];

		if (longitude && latitude) {
			res.push(state?.claim);
		}

		return res.concat(...filteredOptions);
	}, [ state?.claim, filteredOptions ]);

	return (
		<>
			{/* Section: Mobile map */}
			<section className="flex lg:hidden h-[65vh] vw-[100vw] fixed w-full top-0 z-[1]">
				<GoogleMap 
					zoom={zoom}
					center={center}
					onIdle={onIdle}
					markers={memoizedMarkers}
					onMarkerClick={onMarkerClick}
					highlightedMarkerId={highlightedAccomodation?.id}
				/>
			</section>

			{/* Main: Search screen */}
			<main className="flex grid-search z-[40]">
				<section className={setWrapperClassName(loading)}>
					<div className="w-full flex justify-center pt-2 lg:hidden mb-6">
						<span className="border-t-2 border-gray-500 p-1 w-[30%] fill-gray-500 h-[0.5px]" />
					</div>

					{/* Section: Search result header */}
					{loading ? (
						<>
							<div className="mt-[4.8rem] w-full lg:w-[60%] h-4 bg-gray-200 mb-3" />
							<div className="w-3/4 lg:w-1/2 h-9 bg-gray-200 " />
							<div className="my-6 mb-3 w-[4rem] bg-gray-200 rounded-full h-9" />
						</>
					) : (
						<>
							<h6 className="text-1xl font-[400]">
								{pagination?.totalItems || 0}+
								&nbsp;
								{messages.searchTitle}
							</h6>
							<p className="text-xs overflow-hidden mt-2">
								{messages.searchSubtitle}
							</p>
							<div className="xl:py-5 lg:py-3 lg:pt-4 mt-1 py-1 flex items-center mb-5 sm:space-x-3 text-gray-800 flex-wrap max-h-[150px] overflow-hidden">
								<p className="button shadow-md">
									<Stack direction="row" alignItems="center" gap={1}>
										<TuneIcon />
										<Typography>
											{messages.searchFilterCta}
										</Typography>
									</Stack>
								</p>
							</div>
						</>
					)}

					{/* Section: Listing */}
					<div className={setListingWrapperClassName(loading)}>
						{loading ? (
							new Array(9).fill(null).map((item, listingIdx) => (
								<BlankCard key={listingIdx} />
							))
						) : (
							(filteredOptions && filteredOptions.length) ? (
								filteredOptions?.map((item) => (
									<InfoCard 
										key={item?.id} 
										{...item}
									/>
								))
							) : (
								<div className="mx-auto pt-20 pb-36 text-4xl text-slate-900 font-[400]">
									{messages.noResultTitle1}
									<br />
									{messages.noResultTitle2}
								</div>
							)
						)}
						<Pagination 
							onPageClick={handlePageClick}
							count={pagination?.totalPages} 
						/>
					</div>
				</section>

				{/* Section: Desktop map */}
				<section className="hidden lg:inline-flex height-map sticky">
					<GoogleMap 
						zoom={zoom}
						center={center}
						onIdle={onIdle}
						markers={memoizedMarkers}
						onMarkerClick={onMarkerClick}
						highlightedMarkerId={highlightedAccomodation?.id}
					/>
				</section>
			</main>
		</>
	);
}

export default SearchScreen;

