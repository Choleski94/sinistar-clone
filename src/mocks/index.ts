import { ILocation, TCriterionKey, ISearchWeight, ICriterion } from './types';

import listingDB from './database.json';

import imgOne from '../../public/assets/img/rooms/pexels-photo-1428348.jpeg';
import imgTwo from '../../public/assets/img/rooms/pexels-photo-280239.jpeg';
import imgThree from '../../public/assets/img/rooms/pexels-photo-5178080.jpeg';
import imgFour from '../../public/assets/img/rooms/pexels-photo-7195857.jpeg';
import imgFive from '../../public/assets/img/rooms/pexels-photo-14715846.jpeg';

export const MOCK_DATABASE = listingDB;

export const DEFAULT_MAP_ZOOM: number = 11;

// 
export const MIN_WEIGHT: number = 0;
export const MAX_WEIGHT: number = 100;

// Constants for search and calculations.
export const MAX_DISTANCE_KM: number = 100;
export const EARTH_RADIUS_KM: number = 6371;

// Search filters.
export const MIN_DISTANCE: number = 1; 		// Threshold distance.
export const MIN_REVIEW_SCORE: number = 0;
export const MIN_HOST_RESPONSE_RATE: number = 0;
export const MIN_EXTENSION_FLEXIBILITY: number = 0;

export const MAX_DISTANCE: number = 100;
export const MAX_REVIEW_SCORE: number = 5;
export const MAX_HOST_RESPONSE_RATE: number = 1;
export const MAX_EXTENSION_FLEXIBILITY: number = 1;

// Search filter configuration.
export const DEFAULT_CRITERION_FILTERS: { [key in TCriterionKey]: ISearchWeight } = {
	distance: {
		isFloating: false,
		min: MIN_DISTANCE,
		max: MAX_DISTANCE,
	},
	review_score: {
		isFloating: true,
		min: MIN_REVIEW_SCORE,
		max: MAX_REVIEW_SCORE,
	},
	host_response_rate: {
		isFloating: true,
		min: MIN_HOST_RESPONSE_RATE,
		max: MAX_HOST_RESPONSE_RATE,
	},
	extension_flexibility: {
		isFloating: true,
		min: MIN_EXTENSION_FLEXIBILITY,
		max: MAX_EXTENSION_FLEXIBILITY,
	},
};

export const DEFAULT_CRITERION_WEIGHTS: ICriterion = {
	distance: 20,
	review_score: 0,
	host_response_rate: 0,
	extension_flexibility: 0,
}

// Default location (Montréal).
export const MOCK_DEFAULT_LOCATION: ILocation = {
	latitude: 45.508888, 
	longitude: -73.561668,
};

// Mock images for testing/display.
export const MOCK_IMAGES: string[] = [ imgOne, imgTwo, imgThree, imgFour, imgFive ];

// Mock description for testing/display.
export const MOCK_DESCRIPTION: string = 'Lorem ipsum dolor sit amet. Vel dolores dignissimos sit voluptas enim eum autem quas ea dicta natus! Est aperiam autem qui ullam nostrum ut ipsam esse et dignissimos voluptate. Qui soluta corrupti vel dolor expedita est quia possimus.';
