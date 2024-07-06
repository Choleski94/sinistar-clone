import React from 'react';

import { ILocation } from '@mocks/types';

import MapView from './MapView';
import Marker, { TMarkerProps } from './Marker';

interface IGoogleMapProps {
	zoom: number;
	center: ILocation;
	onIdle?: () => void;
	markers?: TMarkerProps[];
	highlightedMarkerId?: string | null;
	onMarkerClick?: (markerId: string) => void;
	onClick?: (event: google.maps.MouseEvent) => void;
}

const GoogleMap: React.FC<IGoogleMapProps> = ({
	zoom,
	onIdle,
	center,
	markers,
	onClick,
	onMarkerClick,
}) => {
	const filteredMarkers = (markers || []).filter((pos: TMarkerProps) => (
		pos.latitude && pos.longitude
	));

	return (
		<MapView
			zoom={zoom}
			minZoom={2}
			maxZoom={18}
			className="map"
			onIdle={onIdle}
			center={center}
			onClick={onClick}
			zoomControl={false}
			mapTypeControl={false}
			clickableIcons={false}
			fullscreenControl={false}
			streetViewControl={false}
		>
			{filteredMarkers?.map((markerProps, markerIdx) => (
				<Marker
					zoom={zoom}
					{...markerProps}
					key={markerProps.id}
					onClick={onMarkerClick}
					markerIdx={markerIdx + 1}
				/>
			))}
		</MapView>
	);
}

export default GoogleMap;

