import { EARTH_RADIUS_KM } from '@mocks';
import { IListingItem } from '@api/types';
import { ILocation, IWeights } from '@mocks/types';

/**
 * Delays execution for a random duration between 0 to 1 second.
 * @returns A Promise that resolves after the random delay.
 */
export const delayRandom = async (): Promise<void> => {
	return new Promise<void>(resolve => {
		const randomDelay = Math.random() * 1000;
		setTimeout(() => {
			resolve();
		}, randomDelay);
	});
};

/**
 * Converts degrees to radians.
 * @param {number} degree - The degree value to convert.
 * @returns {number} The radian equivalent of the degree.
 */
export const toRadians = (degree: number): number => degree * (Math.PI / 180);

/**
 * Calculates the Haversine distance between two coordinates.
 * @param {number} lat1 - Latitude of the first point.
 * @param {number} lon1 - Longitude of the first point.
 * @param {number} lat2 - Latitude of the second point.
 * @param {number} lon2 - Longitude of the second point.
 * @returns {number} The Haversine distance between the points in kilometers.
 */
export const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
	const dLat = toRadians(lat2 - lat1);
	const dLon = toRadians(lon2 - lon1);

	const a = (
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2)
	);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return EARTH_RADIUS_KM * c;
}

/**
 * Calculates a weighted score for an accommodation based on specified criteria.
 * @param {Object} accommodation - The accommodation object containing latitude, longitude, review score, host response rate, and extension flexibility.
 * @param {Object} referencePoint - The reference point object containing latitude and longitude for distance calculation.
 * @param {Object} weights - Object containing weights for distance, review score, host response rate, and extension flexibility.
 * @param {number} maxDistance - Maximum distance in kilometers considered for normalization.
 * @returns {number} The calculated weighted score.
 */
export const calculateScore = (
	accommodation: IListingItem, 
	referencePoint: ILocation, 
	weights: IWeights, 
	maxDistance: number = 100
): number => {
	const distance = haversineDistance(
		accommodation.latitude, accommodation.longitude, 
		referencePoint.latitude, referencePoint.longitude
	);

	const normalizedDistance = Math.min(distance / maxDistance, 1) * 100;

	const weightedScore = (
		normalizedDistance * weights.distance +
		accommodation.review_score * weights.review_score +
		accommodation.host_response_rate * weights.host_response_rate +
		accommodation.extension_flexibility * weights.extension_flexibility
	);

	return weightedScore;
};

