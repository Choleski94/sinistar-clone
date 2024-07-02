import React from 'react';
import { Box, Grid } from '@mui/material';

import { StyledPaper } from './BlankCard.styled';

const BlankCard: React.FC = () => (
	<StyledPaper elevation={3}>
		<Grid container spacing={2} className="lg:h-[16rem]">
			<Grid item xs={12} lg={4} className="lg:h-full h-[10rem]">
				<Box className="w-full h-full bg-gray-200 rounded-xl" />
			</Grid>
			<Grid item xs={12} lg={6} className="w-full h-full lg:px-4 py-1">
				<Box className="w-1/2 h-6 bg-gray-200 mb-2" />
				<Box className="w-full mt-1 h-3 bg-gray-200" />
				<Box className="w-full mt-1 h-3 bg-gray-200" />
				<Box className="w-full mt-1 h-3 bg-gray-200" />
				<Box className="w-1/4 border-gray-200 bg-gray-200 h-7 rounded-lg mt-6" />
			</Grid>
		</Grid>
	</StyledPaper>
);

export default BlankCard;

