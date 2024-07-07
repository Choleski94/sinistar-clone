import React from 'react';
import { Slider, Grid, Typography } from '@mui/material';

import { hasKeys } from '@utils';
import formatMessage from '@utils/formatMessage';
import { ICriterion, TCriterionKey, TCriterionFilter } from '@mocks/types';
import { MAX_WEIGHT, MIN_WEIGHT, DEFAULT_CRITERION_FILTERS, DEFAULT_CRITERION_WEIGHTS } from '@mocks';

import { CriterionContainer, SliderContainer, SliderHeader, StyledTextField, StyledErrorText, FullWidthButton } from './CriterionForm.styled';

interface ICriterionPayload {
	weights: ICriterion;
	filters: TCriterionFilter;
}

interface IFilterFormProps {
	data: ICriterionPayload;
	onSubmit: (criterion: ICriterionPayload) => void;
}

const CriterionForm: React.FC<IFilterFormProps> = ({
	data,
	onSubmit,
}) => {
	const [errors, setErrors] = React.useState<{ [key: string]: boolean }>({});
	const [payload, setPayload] = React.useState<ICriterionPayload>({
		filters: DEFAULT_CRITERION_FILTERS,
		weights: DEFAULT_CRITERION_WEIGHTS,
	});

	const messages = {
		criterionCta: formatMessage('form.criterion.apply.cta'),
		distance: formatMessage('form.criterion.distance.text'),
		weightTitle: formatMessage('form.criterion.weight.text'),
		errorRange: formatMessage('form.criterion.error.range.text'),
		review_score: formatMessage('form.criterion.review_score.text'),
		host_response_rate: formatMessage('form.criterion.host_response_rate.text'),
		extension_flexibility: formatMessage('form.criterion.extension_flexibility.text'),
	}

	React.useEffect(() => {
		setPayload(data);
	}, [data]);

	const handleFilterChange = (newValue: number | number[], key: TCriterionKey) => {
		setErrors({});
		setPayload((prevPayload) => ({
			...prevPayload,
			filters: {
				...prevPayload.filters,
				[key]: {
					min: Array.isArray(newValue) ? newValue[0] : newValue,
					max: Array.isArray(newValue) ? newValue[1] : newValue,
				},
			},
		}));
	};

	const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>, key: TCriterionKey) => {
		const newValue = parseFloat(event.target.value);
		setErrors({});
		setPayload((prevPayload) => ({
			...prevPayload,
			weights: {
				...prevPayload.weights,
				[key]: newValue,
			},
		}));
	};

	// Validate weights
	const validate = () => {
		const errs: { [key: string]: boolean } = {};
		Object.keys(DEFAULT_CRITERION_FILTERS).forEach((key) => {
			const criterionKey = key as TCriterionKey;
			if (
				payload.weights[criterionKey] < MIN_WEIGHT ||
				payload.weights[criterionKey] > MAX_WEIGHT
			) {
				errs[criterionKey] = true;
			}
		});
		return errs;
	};

	const handleSubmit = () => {
		const hasErrors = validate();

		if (hasKeys(hasErrors)) {
			return setErrors(hasErrors);
		}

		onSubmit(payload);
	};

	return (
		<CriterionContainer>
			<Grid container spacing={3}>
				{hasKeys(errors) ? (
					<StyledErrorText variant="body1" gutterBottom>
						{messages.errorRange}
					</StyledErrorText>
				) : null}
				{Object.keys(DEFAULT_CRITERION_FILTERS).map((key) => {
					const criterionKey = key as TCriterionKey;
					return (
						<Grid key={criterionKey} item xs={12} component={SliderContainer}>
							<Grid container spacing={2} alignItems="center">
								<Grid item xs={9}>
									<SliderHeader id={`${criterionKey}-slider`} variant="body1" gutterBottom>
										{messages[criterionKey]}
									</SliderHeader>
									<Slider
										onChange={(_event, newValue) =>
											handleFilterChange(newValue as number[], criterionKey)
										}
										step={DEFAULT_CRITERION_FILTERS[criterionKey].isFloating ? 0.1 : 1}
										min={DEFAULT_CRITERION_FILTERS[criterionKey].min}
										max={DEFAULT_CRITERION_FILTERS[criterionKey].max}
										aria-labelledby={`${criterionKey}-slider`}
										value={[
											payload.filters[criterionKey].min,
											payload.filters[criterionKey].max
										]}
										valueLabelDisplay="auto"
									/>
								</Grid>
								<Grid item xs={3}>
									<Typography variant="body1" gutterBottom>
										{messages.weightTitle}
									</Typography>
									<StyledTextField
										error={errors[criterionKey]}
										value={payload.weights[criterionKey]}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handleWeightChange(event, criterionKey)
										}
										inputProps={{
											min: MIN_WEIGHT, max: MAX_WEIGHT,
											type: 'number',
										}}
										fullWidth
									/>
								</Grid>
							</Grid>
						</Grid>
					);
				})}
			</Grid>
			<FullWidthButton
				onClick={handleSubmit}
				variant="contained"
			>
				{messages.criterionCta}
			</FullWidthButton>
		</CriterionContainer>
	);
};

export default CriterionForm;
