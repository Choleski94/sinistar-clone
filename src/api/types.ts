export interface IPagination {
	page: number;
	limit: number;
	totalItems: number;
	totalPages: number;
}

export interface IListingItem {
	name?: string;
	city?: string;
	address?: string;
	latitude?: number;
	longitude?: number;
    images?: string[];          // Added for better UI/UX
	description?: string;       // Added for better UI/UX
    id?: string | number;
	review_score: number;
    isAccomodation?: boolean;   // Added for better UI/UX
	host_response_rate: number;
	extension_flexibility: number;
}

export interface IListingResponse {
	data: IListingItem | {};
}

export interface IListingListResponse {
	data: {
		result: IListingItem[];
		pagination?: IPagination;
	}
}
