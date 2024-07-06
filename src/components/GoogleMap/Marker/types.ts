export type TMarkerProps = {
	latitude: number;
	longitude: number;
	[key: string]: any; 
	onClick: () => void;
	highlight?: boolean;
	isAccomodation: boolean;
    mapView: google.maps.Map;
};
