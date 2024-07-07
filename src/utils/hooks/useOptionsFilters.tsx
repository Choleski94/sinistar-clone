import React from 'react';

import { IListingItem, ISearchWeight, TCriterionKey } from '@mocks/types';

type TUseOptionFiltersProps = {
	options: IListingItem[];
	filters: { [key in TCriterionKey]: ISearchWeight };
};

const useOptionFilters = ({ options, filters }: TUseOptionFiltersProps): IListingItem[] => {
	const filteredByReviewScoreElts = React.useMemo(() => {
		return options.filter((option) => {
			const { review_score, host_response_rate, extension_flexibility } = option;
			const { review_score: reviewScoreFilter, host_response_rate: hostResponseRateFilter, extension_flexibility: extensionFlexibilityFilter } = filters;

			const isReviewScoreInRange: boolean = review_score >= reviewScoreFilter.min && review_score <= reviewScoreFilter.max;
			const isHostResponseRateInRange: boolean = host_response_rate >= hostResponseRateFilter.min && host_response_rate <= hostResponseRateFilter.max;
			const isExtensionFlexibilityInRange: boolean = extension_flexibility >= extensionFlexibilityFilter.min && extension_flexibility <= extensionFlexibilityFilter.max;

			return isReviewScoreInRange && isHostResponseRateInRange && isExtensionFlexibilityInRange;
		});
	}, [options, filters]);

	return filteredByReviewScoreElts;
};

export default useOptionFilters;

