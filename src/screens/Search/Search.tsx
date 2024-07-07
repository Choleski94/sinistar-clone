import React from 'react';
import { Tune as TuneIcon } from '@mui/icons-material';
import { Stack, Typography, Grid, useMediaQuery } from '@mui/material';

import {
	MOCK_DATABASE,
	MAX_DISTANCE_KM,
	DEFAULT_MAP_ZOOM,
	MOCK_DEFAULT_LOCATION,
	DEFAULT_CRITERION_FILTERS,
	DEFAULT_CRITERION_WEIGHTS,
} from '@mocks';
import { useStore } from '@store';
import { delayRandom } from '@utils';
import formatMessage from '@utils/formatMessage';
import { useAccomodationFilters } from '@utils/hooks';
import { IPagination, IListingItem, ICriterion, ILocation } from '@mocks/types';
import { InfoCard, BlankCard, Pagination, GoogleMap, Modal, Forms, Scrollbar } from '@components';

import { setWrapperClassName, setListingWrapperClassName, parseAccomodationInfo } from './Search.controller';

const SearchScreen: React.FC = () => {
	const { state } = useStore();

	const [loading, setLoading] = React.useState<boolean>(false);
	const [options, setOptions] = React.useState<IListingItem[]>([]);
	const [zoom, setZoom] = React.useState<number>(DEFAULT_MAP_ZOOM);
	const [pagination, setPagination] = React.useState<IPagination>({
		page: 1, limit: 10, totalItems: 0, totalPages: 0,
	});
	const [showFilterModal, setShowFilterModal] = React.useState<boolean>(false);
	const [center, setCenter] = React.useState<ILocation>(MOCK_DEFAULT_LOCATION);
	const [filters, setFilters] = React.useState<ICriterion>(DEFAULT_CRITERION_FILTERS);
	const [weights, setWeights] = React.useState<ICriterion>(DEFAULT_CRITERION_WEIGHTS);

	const withoutScroll = useMediaQuery('(max-width:1023px)');

	const messages = {
		searchTitle: formatMessage('screen.search.title'),
		filterTitle: formatMessage('form.criterion.title'),
		searchSubtitle: formatMessage('screen.search.subtitle'),
		searchFilterCta: formatMessage('screen.search.filter.cta'),
		noResultTitle1: formatMessage('screen.search.no-result.title1'),
		noResultTitle2: formatMessage('screen.search.no-result.title2'),
	}

	const filteredOptions = useAccomodationFilters({
		filters, weights,
		referencePoint: center,
		accommodations: options,
		maxDistance: MAX_DISTANCE_KM,
	});

	React.useEffect(() => {
		setLoading(true);

		delayRandom().then(() => {
			const parsedDB = MOCK_DATABASE.map(parseAccomodationInfo);

			const totalItems = (parsedDB || []).length;
			const totalPages = Math.ceil(totalItems / pagination?.limit);

			setPagination({
				totalPages, totalItems,
				page: pagination?.page,
				limit: pagination?.limit,
			});

			setOptions(parsedDB);

			setLoading(false);
		}).catch(() => {
			setLoading(false);
		})
	}, [])

	const paginatedOptions = React.useMemo(() => {
		const startIndex = (pagination?.page - 1) * pagination?.limit;
		const endIndex = startIndex + pagination?.limit;

		return filteredOptions.slice(startIndex, endIndex);
	}, [filteredOptions, pagination.page]);

	// Update center on claim search.
	React.useEffect(() => {
		const { longitude, latitude } = state?.claim || {};

		if (center && (center.longitude !== longitude || center.latitude !== latitude)) {
			// Update center state with the new coordinates
			setCenter({ longitude, latitude });
		}
	}, [state?.claim, center]);

	const handlePageClick = React.useCallback((newPage: number) => {
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
	}, []);

	const onIdle = React.useCallback((map = { getZoom: () => null, getCenter: () => null }) => {
		setZoom(map?.getZoom() || DEFAULT_MAP_ZOOM);
		const nextCenter = map?.getCenter();

		if (nextCenter) {
			const { lng, lat } = nextCenter as { lng: () => 0; lat: () => 0 };

			const longitude: number = lng();
			const latitude: number = lat();

			if (longitude !== center.longitude || latitude !== center.latitude) {
				setCenter({ longitude, latitude });
			}
		}
	}, [center]);

	const memoizedMarkers = React.useMemo(() => {
		const { longitude, latitude } = state?.claim || {};

		let res = [];

		if (longitude && latitude) {
			res.push(state?.claim);
		}

		return res.concat(...paginatedOptions);
	}, [state?.claim, paginatedOptions]);

	const toggleFilterModal = React.useCallback(() => (
		setShowFilterModal((prevFilterValue) => !prevFilterValue)
	), []);

	const handleCriterionSet = React.useCallback((criterion: { filters: ICriterion; weights: ICriterion }) => {
		setFilters(criterion?.filters);
		setWeights(criterion?.weights);

		toggleFilterModal();

		// Reset pagination page index.
		setPagination((prevPagination) => {
			if (prevPagination?.page > 1) {
				return { ...prevPagination, page: 1 }
			}
			return prevPagination;
		});
	}, [toggleFilterModal]);

	return (
		<>
			{/* Section: Mobile map */}
			<section className="flex lg:hidden h-[65vh] vw-[100vw] fixed w-full top-0 z-[1]">
				<GoogleMap
					zoom={zoom}
					center={center}
					onIdle={onIdle}
					markers={memoizedMarkers}
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
									<Stack direction="row" alignItems="center" gap={1} onClick={toggleFilterModal}>
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
							Array.from({ length: 9 }, (_, listingIdx: number) => (
								<BlankCard key={listingIdx} />
							))
						) : (
							(paginatedOptions && paginatedOptions?.length) ? (
								<Scrollbar withoutScroll={withoutScroll}>
									<Grid className="height-search-listing" container spacing={2}>
										{paginatedOptions?.map((item: IListingItem) => (
											<Grid key={item?.id} item xs={12} md={6}>
												<InfoCard {...item} />
											</Grid>
										))}
									</Grid>
								</Scrollbar>
							) : (
								<div className="mx-auto pt-20 pb-36 text-4xl text-slate-900 font-[400]">
									{messages.noResultTitle1}
									<br />
									{messages.noResultTitle2}
								</div>
							)
						)}
						<Pagination
							page={pagination?.page}
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
					/>
				</section>
				<Modal
					open={showFilterModal}
					onClose={toggleFilterModal}
					title={messages.filterTitle}
				>
					<Forms.Criterion
						onSubmit={handleCriterionSet}
						data={{ filters, weights }}
					/>
				</Modal>
			</main>
		</>
	);
}

export default SearchScreen;

