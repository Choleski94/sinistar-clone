export interface IOverlayViewProps {
	pane?: string;
	zIndex?: number;
	mapView: google.maps.Map;
	children: React.ReactNode;
	position: google.maps.LatLng | google.maps.LatLngLiteral;
}
