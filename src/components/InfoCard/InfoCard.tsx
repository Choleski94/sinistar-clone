import React from 'react';
import { Star as StarIcon } from '@mui/icons-material';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';

import { IListingItem } from '@api/types';

import {
	StyledInfoBox,
	StyledCardMedia,
} from './InfoCard.styled';

// TODO: Use `id` props to create a link.
const InfoCard = ({ name, address, review_score }: IListingItem) => (
	<Card>
		<StyledCardMedia
			image="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
			title={name}
		/>
		<CardContent>
			<StyledInfoBox>
				<Typography variant="h6" component="div">
					{name}
				</Typography>
				<Stack direction="row" alignItems="center" spacing={1}>
					<StarIcon />
					<Typography variant="body2">
						{review_score}
					</Typography>
				</Stack>
			</StyledInfoBox>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography variant="h6" color="textSecondary">
					{address}
				</Typography>
			</Box>
		</CardContent>
	</Card>
);

export default InfoCard;
