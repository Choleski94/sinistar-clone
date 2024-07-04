import React from 'react';
import { Status } from '@googlemaps/react-wrapper';

import MapView from './MapView';
import Marker, { TMarkerProps } from './Marker';

interface IGoogleMapProps {
	zoom: number;
	onIdle?: () => void;
	markers?: TMarkerProps[];
	center: google.maps.LatLngLiteral;
	highlightedMarkerId?: string | null;
	onMarkerClick?: (markerId: string) => void;
	onClick?: (event: google.maps.MouseEvent) => void;
}


const render = (status) => {
	if (status === Status.FAILURE) {
		return <p>failed</p>;
	}
	return <p>loading...</p>;
};

const GoogleMap: React.FC<GoogleMapProps> = ({
	zoom,
	onIdle,
	center,
	markers,
	onClick,
	onMarkerClick,
	highlightedMarkerId,
}) => {
	const filteredMarkers = markers.filter(({ latitude, longitude }) => (
		latitude && longitude
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
					// highlight={markerProps.id === highlightedMarkerId}
				/>
			))}
		</MapView>
	);
}

export default GoogleMap;

