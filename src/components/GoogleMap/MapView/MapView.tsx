import React from 'react';
import { ILocation } from '@mocks/types';
import { configMapView, StyledMapViewContainer } from './MapView.styled';
import { useDeepCompareEffectForMaps } from './useDeepCompareEffectForMaps';

interface IMapViewProps {
	className?: string;
	[key: string]: any;
	center?: ILocation;
	children?: React.ReactNode;
	onIdle?: (map: google.maps.Map) => void;
	onClick?: (event: google.maps.MouseEvent) => void;
}

interface IChildProps {
	[key: string]: any; 
    mapView: google.maps.Map | null;
}

const MapView: React.FC<IMapViewProps> = ({
	center,
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
			const { longitude, latitude } = center || {};
			const initialCenter = { lat: latitude || 0, lng: longitude || 0 };

			const googleMap = new window.google.maps.Map(ref.current, {
				center: initialCenter,
				styles: configMapView,
			});

			setMapView(googleMap);
		}
	}, [ref, mapView, center]);

	useDeepCompareEffectForMaps(() => {
		if (mapView) {
			mapView.setOptions(rest);
		}
	}, [mapView, rest]);

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

	// Handle single child element directly
	let mappedChildren: React.ReactNode  | null = null;
	if (React.isValidElement(children)) {
		mappedChildren = React.cloneElement(children, { mapView } as IChildProps);
	} else if (Array.isArray(children)) {
		// Handle arrays of children if needed
		mappedChildren = React.Children.map(children, (child) => {
			if (React.isValidElement(child)) {
				return React.cloneElement(child, { mapView } as IChildProps);
			}
			return child;
		});
	}

	return (
		<StyledMapViewContainer ref={ref} className={className}>
			{mappedChildren}
		</StyledMapViewContainer>
	);
}

export default MapView;
