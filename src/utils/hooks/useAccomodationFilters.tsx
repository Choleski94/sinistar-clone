import React from 'react';

import { calculateScore, IAccommodation, IReferencePoint, IWeights } from '../';

interface IuseAccomodationFiltersProps {
	weights: IWeights;
	maxDistance: number;
	referencePoint: IReferencePoint;
	accommodations: IAccommodation[];
}

const useAccomodationFilters = ({
	weights,
	maxDistance,
	accommodations,
	referencePoint,
}: IuseAccomodationFiltersProps) => {
	const rankedAccommodations = React.useMemo(() =>
		accommodations.map((tmpAccommodation) => {
			const score = calculateScore(tmpAccommodation, referencePoint, weights, maxDistance);
			return { ...tmpAccommodation, score };
		}).sort((a, b) => b.score - a.score),
		[ accommodations, referencePoint, weights, maxDistance ]
	);

	return rankedAccommodations;
}

export default useAccomodationFilters;

