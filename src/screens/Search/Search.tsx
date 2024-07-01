import React from 'react';

import {
	setWrapperClassName,
	setListingWrapperClassName, 
} from './Search.controller';

import api from '../../api';
import { InfoCard, BlankCard } from '../../components';

const SearchScreen: React.FC = () => {
	const [ title, setTilte ] = React.useState('');
	const [ options, setOptions ] = React.useState([]);
	const [ loading, setLoading ] = React.useState(false);

	React.useEffect(() => {
		setLoading(true);

		// TODO: Need to update InfoCard.
		// api.listing.list().then(({ data }) => {
		// 	setOptions(data);
		// 	setLoading(false);
		// }).catch(() => {
		// 	setLoading(false);
		// });
	}, []);

	const filteredOptions = options;

	return (
		<>
			{/* Section: Mobile map */}
			<section className="flex lg:hidden h-[65vh] vw-[100vw] fixed w-full top-0 z-[1]">
				Mobile Map
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
							<p className="text-xs overflow-hidden">
								{filteredOptions.length} accommodations in this area
							</p>
							<h1 className="text-3xl font-[400] mt-2">
								Stays in
								&nbsp;
								<span className="capitalize">
									{title}
								</span>
							</h1>
							<div className="xl:py-5 lg:py-3 lg:pt-4 mt-1 py-1 flex items-center mb-5 sm:space-x-3 text-gray-800 flex-wrap max-h-[150px] overflow-hidden">
								<p className="button shadow-md">
									FILTERS
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
									<InfoCard key={item?.id} {...item} />
								))
							) : (
								<div className="mx-auto pt-20 pb-36 text-4xl text-slate-900 font-[400]">
									It looks like there isn’t any housing in this area just yet. 
									<br />
									But why not ask for a quote anyway? You never know!
								</div>
							)
						)}
					</div>
				</section>

				{/* Section: Desktop map */}
				<section className="hidden lg:inline-flex height-map sticky top-[6.8rem]">
					Desktop Map
				</section>
			</main>
		</>
	);
}

export default SearchScreen;
