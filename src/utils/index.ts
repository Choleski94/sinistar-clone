import { ILocation, IListingItem, ICriterion } from '@mocks/types';
import { EARTH_RADIUS_KM, MAX_REVIEW_SCORE, MAX_DISTANCE } from '@mocks';

/**
 * Checks if the given object has any keys.
 * 
 * @param {Record<string, any>} [payload={}] - The object to check for keys.
 * @returns {boolean} - Returns true if the object has keys, false otherwise.
 */
export const hasKeys = (payload: Record<string, any> = {}): number => {
    return Object.keys(payload).length;
};

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
 * @param {Object} filters - Object containing weights for distance, review score, host response rate, and extension flexibility.
 * @param {number} maxDistance - Maximum distance in kilometers considered for normalization.
 * @returns {number} The calculated weighted score.
 */
export const calculateScore = (
	accommodation: IListingItem, 
	referencePoint: ILocation, 
	filters: ICriterion, 
	weights: ICriterion,
	maxDistance: number = MAX_DISTANCE
): number => {
	const distance = haversineDistance(
		accommodation.latitude, accommodation.longitude, 
		referencePoint.latitude, referencePoint.longitude
	);

	// Normalize distance to a range of 0-100
	const normalizedDistance = Math.min(distance / maxDistance, 1) * weights.distance;

	// Normalize review score, host response rate, and extension flexibility to a range of 0-100.
	const normalizedHostResponseRate = accommodation.host_response_rate * weights.host_response_rate;
	const normalizedReviewScore = (accommodation.review_score / MAX_REVIEW_SCORE) * weights.host_response_rate;
	const normalizedExtensionFlexibility = accommodation.extension_flexibility * weights.extension_flexibility;

	// Calculate the weighted score
	const weightedScore = (
		normalizedDistance * (filters.distance / 100) +
		normalizedReviewScore * (filters.review_score / 100) +
		normalizedHostResponseRate * (filters.host_response_rate / 100) +
		normalizedExtensionFlexibility * (filters.extension_flexibility / 100)
	);

	// Calculate the total weight
	const totalWeight = filters.distance + filters.review_score + filters.host_response_rate + filters.extension_flexibility;

	// Return the final score out of 100
	return (weightedScore / totalWeight) * 100;
};