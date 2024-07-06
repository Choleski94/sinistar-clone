export type TSearchWeightsKey = 'distance' | 'review_score' | 'host_response_rate' | 'extension_flexibility';

export interface ILocation {
	latitude: number;
	longitude: number;
}

export interface ISearchWeight {
	min: number;
	max: number;
	isFloating?: boolean;
}

export interface IWeights {
	distance: number;
	latitude?: number;
	longitude?: number;
	review_score: number;
	host_response_rate: number;
	extension_flexibility: number;
}
