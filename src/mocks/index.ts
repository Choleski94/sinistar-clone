import imgOne from '../../public/assets/img/rooms/pexels-photo-1428348.jpeg';
import imgTwo from '../../public/assets/img/rooms/pexels-photo-280239.jpeg';
import imgThree from '../../public/assets/img/rooms/pexels-photo-5178080.jpeg';
import imgFour from '../../public/assets/img/rooms/pexels-photo-7195857.jpeg';
import imgFive from '../../public/assets/img/rooms/pexels-photo-14715846.jpeg';

export const MAX_DISTANCE_KM:number = 100;

export const EARTH_RADIUS_KM: number = 6371;

export const DEFAULT_SEARCH_WEIGHTS: {
	distance: number,
	review_score: number,
	host_response_rate: number,
	extension_flexibility: number,
} = {
	distance: 0.3,
	review_score: 0.4,
	host_response_rate: 0.2,
	extension_flexibility: 0.1,
};

// Montréal position.
export const MOCK_DEFAULT_LOCATION: { latitude: number, longitude: number } = { latitude: 45.508888, longitude: -73.561668 };

export const MOCK_IMAGES: string[] = [ imgOne, imgTwo, imgThree, imgFour, imgFive ];

export const MOCK_DESCRIPTION: string = 'Lorem ipsum dolor sit amet. Vel dolores dignissimos sit voluptas enim eum autem quas ea dicta natus! Est aperiam autem qui ullam nostrum ut ipsam esse et dignissimos voluptate. Qui soluta corrupti vel dolor expedita est quia possimus.';
