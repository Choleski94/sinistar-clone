import React from 'react';
import { IconButton, styled } from '@mui/material';

interface ICarouselIconButtonProps {
	$visible?: boolean;
	$positionAlignement?: string;
}

export const StyledIconButton = styled(IconButton)<ICarouselIconButtonProps>(({ theme, $visible, $positionAlignement }) => ({
	zIndex: 1,
	top: '50%',
	position: 'absolute',
	backgroundColor: '#fff',
	transform: 'translateY(-50%)',
	transition: 'opacity 0.3s ease',
	display: $visible ? 'flex' : 'none',
	'&:hover': {
		backgroundColor: theme.palette.background.paper,
	},
	[$positionAlignement]: 5,
}));

export const CarouselIconButton: React.FC<ICarouselIconButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
	$visible, $positionAlignement, ...props
}) => (
	<StyledIconButton 
		$positionAlignement={$positionAlignement} 
		$visible={$visible} 
		{...props}
	/>
);

