import * as tf from '@tensorflow/tfjs';

import { EARTH_RADIUS_KM, MAX_REVIEW_SCORE } from '@mocks';
import { ILocation, IListingItem, ICriterion } from '@mocks/types';

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

	const lat1Rad = toRadians(lat1);
	const lat2Rad = toRadians(lat2);

	const a = tf.add(
		tf.sin(tf.div(dLat, 2)).square(),
		tf.mul(
			tf.cos(lat1Rad),
			tf.mul(tf.cos(lat2Rad), tf.sin(tf.div(dLon, 2)).square())
		)
	);

	const c = tf.mul(2, tf.atan2(tf.sqrt(a), tf.sqrt(tf.sub(1, a))));

	return tf.mul(EARTH_RADIUS_KM, c).arraySync() as number;
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
): { distance: number; score: number; } => {
	// Max possible score is equal to the total number of weight criteria.
	const maxPossibleScore = Object.keys(weights || {}).length || 1;

	// Step 0: Calculate distance between accommodation and reference point.
	const distance = haversineDistance(
		accommodation.latitude, accommodation.longitude,
		referencePoint.latitude, referencePoint.longitude
	);

	// Step 1: Normalize weights to a range of 0 - 1.
	const scaledWeightDistance = weights.distance / 100;
	const scaledWeightReviewScore = weights.review_score / 100;
	const scaledWeightHostResponseRate = weights.host_response_rate / 100;
	const scaledWeightExtensionFlexibility = weights.extension_flexibility / 100;

	// Step 2: Normalize distance to a range of 0 - 1;
	const normalizedDistance = tf.div(1, tf.add(distance, 1)).arraySync() as number; // Ensure shorter distances get higher scores.

	// Step 3: Normalize review score, host response rate, and extension flexibility to a range of 0-1.
	const normalizedHostResponseRate = accommodation.host_response_rate / 100; // Already in a range of 0 - 1/
	const normalizedExtensionFlexibility = accommodation.extension_flexibility / 10; // Assuming a max value of 10.
	const normalizedReviewScore = accommodation.review_score / MAX_REVIEW_SCORE;

	// Step 4: Calculate the weighted score components.
	const weightedDistanceComponent = normalizedDistance * scaledWeightDistance;
	const weightedReviewScoreComponent = normalizedReviewScore * scaledWeightReviewScore;
	const weightedHostResponseRateComponent = normalizedHostResponseRate * scaledWeightHostResponseRate;
	const weightedExtensionFlexibilityComponent = normalizedExtensionFlexibility * scaledWeightExtensionFlexibility;

	// Step 5: Sum up the weighted components.
	const weightedScore = (
		weightedDistanceComponent +
		weightedReviewScoreComponent +
		weightedHostResponseRateComponent +
		weightedExtensionFlexibilityComponent
	);

	// Step 6: Scale the weighted score to a range of 0-100
	const scoreOutOf100 = (weightedScore / maxPossibleScore) * 100;

	return { distance, score: scoreOutOf100 };
};
