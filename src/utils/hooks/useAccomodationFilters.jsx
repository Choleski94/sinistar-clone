import React from 'react';

import { calculateScore } from '../';

const useAccomodationFilters = ({
	weights,
	maxDistance,
	accommodations, 
	referencePoint, 
}) => {
	const rankedAccommodations = React.useMemo(() => accommodations.map((tmpAccommodation) => {
		const score = calculateScore(tmpAccommodation, referencePoint, weights, maxDistance);
		return { ...tmpAccommodation, score };
	}), [ accommodations, referencePoint, weights, maxDistance ]);

	return rankedAccommodations.sort((a, b) => b.score - a.score);
}

export default useAccomodationFilters;
