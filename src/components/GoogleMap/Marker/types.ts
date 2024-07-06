export type TMarkerProps = {
	latitude: number;
	longitude: number;
	[key: string]: any; 
	isAccomodation: boolean;
    mapView: google.maps.Map;
};
