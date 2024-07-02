import React from 'react';
import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

import { CarouselIconButton } from './Carousel.styled';

const CarouselControls: React.FC<{
	showPrevControl?: boolean;
	showNextControl?: boolean;
	onPrev: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ onPrev, onNext, showPrevControl, showNextControl }) => (
	<>
		<CarouselIconButton
			onClick={onPrev}
			aria-label="previous"
			$visible={showPrevControl}
			$positionAlignement="left"
		>
			<ChevronLeftIcon />
		</CarouselIconButton>
		<CarouselIconButton
			onClick={onNext}
			aria-label="next"
			$visible={showNextControl}
			$positionAlignement="right"
		>
			<ChevronRightIcon />
		</CarouselIconButton>
	</>
);

export default CarouselControls;

