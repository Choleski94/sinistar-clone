import { MOCK_IMAGES, MOCK_DESCRIPTION } from '../../mocks';

/**
 * Sets the CSS class name for the listing wrapper based on the provided conditions.
 * @param {boolean} [isReady=false] - Whether the listing is ready.
 * @returns {string} The computed CSS class name.
 */
export const setWrapperClassName = (isReady?: boolean = false): string => ([
	'flex-grow', 
	(isReady ? 'w-full' : 'absolute'), 
	'lg:pt-10', 
	'lg:static', 
	'top-[57vh]', 
	'xl:pt-8', 
	'px-6', 
	'bg-white', 
	'rounded-t-[1.7rem]', 
	'z-[40]',
].join(' ').trim());

/**
 * Sets the CSS class name for the listing card wrapper based on the provided conditions.
 * @param {boolean} [isReady=false] - Whether the listing card is ready.
 * @returns {string} The computed CSS class name.
 */
export const setListingWrapperClassName = (isReady?: boolean = false): string => ([
	(isReady ? 'py-3' : ''),
	'flex', 
	'flex-col',
	(isReady ? 'gap-5' : 'max-w-full'), 
	'pb-28',
].join(' ').trim());

/**
 * Parses accommodation information and returns a structured object.
 * @param {Partial<AccommodationInfo>} [data={}] - Partial data to parse into AccommodationInfo.
 * @returns {AccommodationInfo} The parsed accommodation information.
 */
export const parseAccomodationInfo = (data: any) => ({
	...data,
	images: MOCK_IMAGES,
	isAccomodation: true,
	description: MOCK_DESCRIPTION,
	id: (data?.id || '').toString(),
});

