'use strict';

import { delayRandom } from '../utils';
import listingDB from './database.json';

interface IListingItem {
	id: string;
	name: string;
	city: string;
	address: string;
	latitude: number;
	longitude: number;
	review_score: number;
	host_response_rate: number;
	extension_flexibility: number;
}

interface IListingResponse {
	data: IListingItem | {};
}

interface IListingListResponse {
	data: {
		result: IListingItem[];
		pagination: {
			page: number;
			limit: number;
			totalPages: number;
			totalItems: number;
		};
	}
}

const listingDBTyped: IListingItem[] = listingDB as IListingItem[];

const listing = {
	get: async (id: number): Promise<IListingResponse> => {
		// Verify valid id.
		if (id === undefined || id === null) {
			throw new Error('ID parameter is required to fetch a listing.');
		}

		try {
			const targetListing = listingDBTyped.find(({ id }) => item.id === id);

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
	list: async ({ page, limit }: { page?: number; limit?: number; }): Promise<IListingListResponse> => {
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
