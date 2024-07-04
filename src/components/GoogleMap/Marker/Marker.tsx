import React from 'react';
import { motion } from 'framer-motion';

import Card from '../Card';
import { Icons } from './Marker.styled';
import OverlayView from '../OverlayView';

export type TMarkerProps = {
	mapView: boolean;
	latitude: number;
	longitude: number;
	[key: string]: any; 
	onClick: () => void;
	highlight?: boolean;
	isAccomodation: boolean;
};

const Marker: React.FC<MarkerProps> = ({
	mapView, 
	OnClick, 
	highlight,
	latitude: lat, 
	longitude: lng,
	isAccomodation, 
	...rest
}) => {
	const cardRef = React.useRef<HTMLDivElement>(null);

	const [ showCard, setShowCard ] = React.useState(false);

	const handleClick = React.useCallback(() => {
		if (!isAccomodation) return;
		setShowCard((prevShowCard) => !prevShowCard);
	}, [ isAccomodation ]);

	if (!mapView) return null;

	React.useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
				setShowCard(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<OverlayView
			mapView={mapView}
			position={{ lat, lng }}
			// zIndex={highlight ? 99 : 0}
		>
			<motion.div
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				transition={{ damping: 20, type: 'spring', stiffness: 400 }}
				animate={{ opacity: 1, transition: { delay: Math.random() * 0.3 } }}
			>
				<div className="marker" onClick={handleClick}>
					{showCard && <Card ref={cardRef} {...rest as any} />}
					{isAccomodation ? (
						<Icons.Accomodation />
					) : (
						<Icons.House />
					)}
				</div>
			</motion.div>
		</OverlayView>
	);
}

export default Marker;

