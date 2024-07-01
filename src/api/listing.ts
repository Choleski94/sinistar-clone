'use strict';

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
	data: IListingItem[];
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

			return {
				data: targetListing || {},
			};
		} catch (error) {
			console.error('Error fetching listing by id:', error);
			return {
				data: {},
			};
		}
	},
	list: async (): Promise<IListingListResponse> => {
		try {
			return {
				data: listingDB,
			};
		} catch (error) {
			console.error('Error fetching listing list:', error);
			return {
				data: [],
			};	
		}
	},
};

export default listing;
