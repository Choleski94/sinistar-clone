import React from 'react';
import { createCustomEqual, deepEqual } from 'fast-equals';

/**
 * Custom hook that uses deep comparison for dependencies to determine whether
 * to re-run the effect.
 *
 * @param {React.EffectCallback} callback - The callback to run.
 * @param {any[]} dependencies - The dependencies for the effect.
 */
export const useDeepCompareEffectForMaps = (callback: React.EffectCallback, dependencies: any[]) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(callback, dependencies.map(useDeepCompareMemorize));
};

/**
 * Memorizes the value using a deep comparison.
 *
 * @param {any} value - The value to memorize.
 * @returns {any} - The memorized value.
 */
export const useDeepCompareMemorize = (value: any) => {
	const ref = React.useRef<any>();

	if (!deepCompareEqualsForMaps(value, ref.current)) {
		ref.current = value;
	}

	return ref.current;
};

/**
 * Checks if an object is a LatLngLiteral.
 *
 * @param {any} obj - The object to check.
 * @returns {obj is { lat: number, lng: number }} - True if the object is a LatLngLiteral.
 */
export const isLatLngLiteral = (obj: any): obj is { lat: number; lng: number } => 
	obj != null && typeof obj === 'object' && 
	Number.isFinite(obj.lat) && Number.isFinite(obj.lng);

/**
 * Custom deep comparison function for maps.
 *
 * @param {object} options - The options for comparison.
 * @returns {boolean} - Whether the two objects are equal.
 */
export const deepCompareEqualsForMaps = createCustomEqual<any>((options) => ({
	areObjectsEqual(a, b) {
		// Assuming google.maps is properly imported and available
		if (
			isLatLngLiteral(a) || a instanceof google.maps.LatLng || 
			isLatLngLiteral(b) || b instanceof google.maps.LatLng
		) {
			return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
		}

		return deepEqual(a, b);
	},
}));

