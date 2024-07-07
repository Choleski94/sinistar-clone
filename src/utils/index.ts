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
 * @returns {number} The calculated weighted score.
 */
export const calculateScore = (
	accommodation: IListingItem,
	referencePoint: ILocation,
	weights: ICriterion,
): number => {
	const distance = haversineDistance(
		accommodation.latitude, accommodation.longitude,
		referencePoint.latitude, referencePoint.longitude
	);

	// Step 0: Calculate scaled weights to a range of 0 - 1.
	const scaledWeightDistance = weights.distance / 100;
	const scaledWeightReviewScore = weights.review_score / 100;
	const scaledWeightHostResponseRate = weights.host_response_rate / 100;
	const scaledWeightExtensionFlexibility = weights.extension_flexibility / 100;

	// Step 1: Normalize distance to a range of 0 - 1;
	const normalizedDistance = (1 / (distance + 1)); 								// Ensure shorter distances get higher scores.

	// Step 2: Normalize review score, host response rate, and extension flexibility to a range of 0-1.
	const normalizedHostResponseRate = accommodation.host_response_rate; 			// Already in a range of 0 - 1/
	const normalizedExtensionFlexibility = accommodation.extension_flexibility; 	// Already in a range of 0 - 1.
	const normalizedReviewScore = accommodation.review_score / MAX_REVIEW_SCORE;

	// Step 3: Calculate the weighted score components.
    const weightedDistanceComponent = normalizedDistance * scaledWeightDistance;
    const weightedReviewScoreComponent = normalizedReviewScore * scaledWeightReviewScore;
    const weightedHostResponseRateComponent = normalizedHostResponseRate * scaledWeightHostResponseRate;
    const weightedExtensionFlexibilityComponent = normalizedExtensionFlexibility * scaledWeightExtensionFlexibility;

    // Step 4: Sum up the weighted components.
    const weightedScore = (
        weightedDistanceComponent +
        weightedReviewScoreComponent +
        weightedHostResponseRateComponent +
        weightedExtensionFlexibilityComponent
    );

	// Step 5: Scale the weighted score to a range of 0-100
	const scoreOutOf100 = (weightedScore / 1) * 100; 								// Here, 1 is the total weight (scaled to 1).

	return scoreOutOf100;
};