import React from 'react';

import { ICriterion, IListingItem, ILocation } from '@mocks/types';

import { calculateScore } from '../';

interface IuseAccomodationFiltersProps {
	filters: ICriterion;
	weights: ICriterion;
	maxDistance: number;
	referencePoint: ILocation;
	accommodations: IListingItem[];
}

const useAccomodationFilters = ({
	filters,
	weights,
	maxDistance,
	accommodations,
	referencePoint,
}: IuseAccomodationFiltersProps) => {
	const rankedAccommodations = React.useMemo(() =>
		accommodations.map((tmpAccommodation) => {
			const score = calculateScore(tmpAccommodation, referencePoint, filters, weights, maxDistance);
			return { ...tmpAccommodation, score };
		}).sort((a, b) => b.score - a.score),
		[ accommodations, referencePoint, filters, weights, maxDistance ]
	);

	return rankedAccommodations;
}

export default useAccomodationFilters;

