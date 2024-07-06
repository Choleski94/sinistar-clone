import React from 'react';

import { IListingItem } from '@api/types';
import { IWeights, ILocation } from '@mocks/types';

import { calculateScore } from '../';

interface IuseAccomodationFiltersProps {
	weights: IWeights;
	maxDistance: number;
	referencePoint: ILocation;
	accommodations: IListingItem[];
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

