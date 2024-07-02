import React from 'react';
import { Box } from '@mui/material';

import CarouselControls from './CarouselControls';

interface ICarouselProps {
	width?: number;
	height?: number;
	images?: string[];
}

const DEFAULT_WIDTH = 250;
const DEFAULT_HEIGHT = 166.666;

const Carousel: React.FC<ICarouselProps> = ({
	images = [],
	width = DEFAULT_WIDTH,
	height = DEFAULT_HEIGHT,
}) => {
	const [ currentIndex, setCurrentIndex ] = React.useState(0);
	const [ showControls, setShowControls ] = React.useState(false);
	const [ showPrevControl, setShowPrevControl ] = React.useState(false);
	const [ showNextControl, setShowNextControl ] = React.useState(false);

	const totalImage = React.useMemo(() => (
		(images || [])?.length || 0
	), [ (images || []).length ]);

	const handlePrev = () => setCurrentIndex((prevIndex) => (
		prevIndex === 0 ? totalImage - 1 : prevIndex - 1)
	);

	const handleNext = () => setCurrentIndex((prevIndex) => (
		prevIndex === totalImage - 1 ? 0 : prevIndex + 1)
	);

	const handleMouseEnter = () => setShowControls(true);

	const handleMouseLeave = () => setShowControls(false);

	React.useEffect(() => {
		setShowPrevControl(currentIndex !== 0);
		setShowNextControl(currentIndex !== totalImage - 1);
	}, [ currentIndex, totalImage ]);

	return (
		<Box
			alignItems="center"
			flexDirection="column"
			justifyContent="center"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Box position="relative" width={width}>
				<CarouselControls
					onPrev={handlePrev} onNext={handleNext}
					showPrevControl={showControls && showPrevControl}
					showNextControl={showControls && showNextControl}
				/>
				<Box position="relative" width="100%" height={`${height}px`}>
					<img
						src={images[currentIndex]}
						width="100%" height="100%"
						alt={`Slide ${currentIndex + 1}`}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Carousel;

