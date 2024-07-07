import React from 'react';

import { ILocation } from '@mocks/types';
import { MOCK_DEFAULT_LOCATION } from '@mocks';

import MapView from './MapView';
import Marker, { TMarkerProps } from './Marker';

interface IGoogleMapProps {
	zoom: number;
	center: ILocation;
	onIdle?: () => void;
	markers: TMarkerProps[];
	onClick?: (event: google.maps.MouseEvent) => void;
}

const GoogleMap: React.FC<IGoogleMapProps> = ({
	zoom,
	onIdle,
	center,
	markers,
	onClick,
}) => {
	const [activeCenter, setActiveCenter] = React.useState<ILocation>(MOCK_DEFAULT_LOCATION);

	const filteredMarkers = markers.filter((pos: TMarkerProps) => (
		pos.latitude !== undefined && pos.longitude !== undefined
	));

	React.useEffect(() => {
		const hasCenter = center.longitude && center.latitude;
		if (hasCenter && (activeCenter.longitude !== center.longitude || activeCenter.latitude !== center.latitude)) {
			setActiveCenter(center);
		}
	}, [center, activeCenter]);


	return (
		<MapView
			zoom={zoom}
			minZoom={2}
			maxZoom={18}
			className="map"
			onIdle={onIdle}
			onClick={onClick}
			zoomControl={false}
			center={activeCenter}
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
					markerIdx={markerIdx + 1}
				/>
			))}
		</MapView>
	);
}

export default GoogleMap;

