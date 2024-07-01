/**
 * Sets the CSS class name for the listing wrapper based on the provided conditions.
 * @param {boolean} [isReady=false] - Whether the listing is ready.
 * @returns {string} The computed CSS class name.
 */
export const setWrapperClassName = (isReady?: boolean = false): string => ([
	'flex-grow', 
	(isReady ? 'absolute' : 'w-full'), 
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
	(isReady ? '' : 'py-3'),
	'flex', 
	'flex-col',
	(isReady ? 'max-w-full' : 'gap-5'), 
	'pb-28',
].join(' ').trim());

