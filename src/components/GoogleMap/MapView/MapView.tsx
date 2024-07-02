import React from 'react';

import { configMapView, StyledMapViewContainer } from './MapView.styled';
import { useDeepCompareEffectForMaps } from './useDeepCompareEffectForMaps';

interface IMapViewProps {
	className?: string;
	[key: string]: any;
	children?: React.ReactNode;
	onIdle?: (map: google.maps.Map) => void;
	onClick?: (event: google.maps.MouseEvent) => void;
}

const MapView: React.FC<IMapViewProps> = ({
	className = '', 
	children = null, 
	onIdle = () => null, 
	onClick = () => null, 
	...rest
}) => {
	const ref = React.useRef<HTMLDivElement>(null);

	const [ mapView, setMapView ] = React.useState<google.maps.Map | null>(null);

	React.useEffect(() => {
		if (ref.current && !mapView) {
			const googleMap = new window.google.maps.Map(ref.current, {
				styles: configMapView,
			});

			setMapView(googleMap);
		}
	}, [ ref, mapView ]);

	useDeepCompareEffectForMaps(() => {
		if (mapView) {
			mapView.setOptions(rest);
		}
	}, [ mapView, rest ]);

	React.useEffect(() => {
		if (mapView) {
			['click', 'idle'].forEach((eventName) =>
				window.google.maps.event.clearListeners(mapView, eventName)
			);

			if (onClick) {
				mapView.addListener('click', onClick);
			}

			if (onIdle) {
				mapView.addListener('idle', () => onIdle(mapView));
			}
		}
	}, [ mapView, onClick, onIdle ]);

	return (
		<StyledMapViewContainer ref={ref} className={className}>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, { mapView });
				}
				return null;
			})}
		</StyledMapViewContainer>
	);
}

export default MapView;

