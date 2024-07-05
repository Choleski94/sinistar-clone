'use strict';

import { delayRandom } from '../utils';
import listingDB from '../mocks/database.json';

import { IListingItem, IListingResponse, IListingListResponse } from './types';

const listingDBTyped: IListingItem[] = listingDB;

const listing = {
	get: async (id: number): Promise<IListingResponse> => {
		// Verify valid id.
		if (id === undefined || id === null) {
			throw new Error('ID parameter is required to fetch a listing.');
		}

		try {
			const targetListing = listingDBTyped.find((item) => item.id === id);

			await delayRandom();

			return {
				data: {
					retult: targetListing || {},
				}
			};
		} catch (error) {
			console.error('Error fetching listing by id:', error);
			return {
				data: {
					result: {},
				},
			};
		}
	},
	search: async (): Promise<IListingListResponse> => {
		try {
			await delayRandom();

			/* TODO: Implement search based on desired fields.
			 * 	- Evaluate if we want to add pagination support.	
			 */
			return {
				data: {
					result: listingDBTyped || [],
				},
			};
		} catch (error) {
			console.error('Error fetching listing list:', error);
			return {
				data: {
					result: [],
					pagination: {
						page: 0,
						limit: 0,
						totalPages: 0,
						totalItems: 0,
					},
				},
			};	
		}
	},
	list: async ({ page, limit }: { page: number; limit: number; }): Promise<IListingListResponse> => {
		try {
			const totalItems = (listingDBTyped || []).length;
			const totalPages = Math.ceil(totalItems / limit);
			const startIndex = (page - 1) * limit;
			const endIndex = startIndex + limit;

			const paginatedData = listingDBTyped.slice(startIndex, endIndex);

			await delayRandom();

			return {
				data: {
					result: paginatedData || [],
					pagination: {
						page,
						limit,
						totalPages,
						totalItems,
					},
				},
			};
		} catch (error) {
			console.error('Error fetching listing list:', error);
			return {
				data: {
					result: [],
					pagination: {
						page: 0,
						limit: 0,
						totalPages: 0,
						totalItems: 0,
					},
				},
			};	
		}
	},
};

export default listing;
