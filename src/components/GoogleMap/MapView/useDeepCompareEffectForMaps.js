import React from 'react';
import { createCustomEqual, deepEqual } from 'fast-equals';

export const useDeepCompareEffectForMaps = (callback, dependencies) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(callback, dependencies.map(useDeepCompareMemorize))
}

const useDeepCompareMemorize = (value) => {
	const ref = React.useRef()

	if (!deepCompareEqualsForMaps(value, ref.current)) {
		ref.current = value
	}

	return ref.current
}

// https://github.com/googlemaps/js-typescript-guards/blob/main/src/lat-lng.ts
const isLatLngLiteral = (obj) => obj != null && typeof obj === 'object' && Number.isFinite(obj.lat) && Number.isFinite(obj.lng)

const deepCompareEqualsForMaps = createCustomEqual((options) => ({
	areObjectsEqual(a, b) {
		if (isLatLngLiteral(a) || a instanceof google.maps.LatLng || isLatLngLiteral(b) || b instanceof google.maps.LatLng) {
			return new google.maps.LatLng(a).equals(new google.maps.LatLng(b))
		}
		return deepEqual(a, b)
	},
}))
