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
	latitude: number;
	longitude: number;
    images?: string[];          // Added for better UI/UX
	description?: string;       // Added for better UI/UX
    id?: string | number;
	review_score: number;
    isAccomodation?: boolean;   // Added for better UI/UX
	host_response_rate: number;
	extension_flexibility: number;
}

export type TCriterionKey = 'distance' | 'review_score' | 'host_response_rate' | 'extension_flexibility';

export interface ILocation {
	latitude: number;
	longitude: number;
}

export interface ISearchWeight {
	min: number;
	max: number;
	isFloating?: boolean;
}

export interface ICriterion {
	distance: number;
	latitude?: number;
	longitude?: number;
	review_score: number;
	host_response_rate: number;
	extension_flexibility: number;
}
