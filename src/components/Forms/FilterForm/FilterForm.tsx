import React from 'react';
import { Slider, Grid, Typography } from '@mui/material';

import formatMessage from '@utils/formatMessage';
import { IWeights, TSearchWeightsKey } from '@mocks/types';
import { SEARCH_WEIGHTS, DEFAULT_SEARCH_WEIGHTS } from '@mocks';

import { FilterContainer, SliderContainer, FullWidthButton } from './FilterForm.styled';

interface IFilterFormProps {
	data?: IWeights;
	onSubmit: (filters: IWeights) => void;
}

const FilterForm: React.FC<IFilterFormProps> = ({
	data,
	onSubmit,
}) => {
	const [ filters, setFilters ] = React.useState<IWeights>(DEFAULT_SEARCH_WEIGHTS);

	const messages = {
		filterCta: formatMessage('form.filter.apply.cta'),
		distance: formatMessage('form.filter.distance.text'),
		review_score: formatMessage('form.filter.review_score.text'),
		host_response_rate: formatMessage('form.filter.host_response_rate.text'),
		extension_flexibility: formatMessage('form.filter.extension_flexibility.text'),
	}

	React.useEffect(() => {
		setFilters({ ...filters, ...data });
	}, [ data ]);

	const handleSliderChange = (_event: Event, newValue: number | number[], key: TSearchWeightsKey) => {
		setFilters({
			...filters,
			[key]: newValue,
		});
	};

	const handleSubmit = () => {
		onSubmit(filters);
	};

	return (
		<FilterContainer>
			<Grid container spacing={3}>
				{Object.keys(SEARCH_WEIGHTS).map((key) => {
					const weightKey = key as TSearchWeightsKey;
					return (
						<Grid key={weightKey} item xs={12} component={SliderContainer}>
							<Typography id={`${weightKey}-slider`} gutterBottom>
								{messages[weightKey]}
							</Typography>
							<Slider
								onChange={(event, newValue) =>
									handleSliderChange(event, newValue as number, weightKey)
								}
								step={SEARCH_WEIGHTS[weightKey].isFloating ? 0.1 : 1}
								aria-labelledby={`${weightKey}-slider`}
								min={SEARCH_WEIGHTS[weightKey].min}
								max={SEARCH_WEIGHTS[weightKey].max}
								value={filters[weightKey]}
								valueLabelDisplay="auto"
							/>
						</Grid>
					);
				})}
			</Grid>
			<FullWidthButton
				onClick={handleSubmit}
				variant="contained"
			>
				{messages.filterCta}
			</FullWidthButton>
		</FilterContainer>
	);
};

export default FilterForm;

