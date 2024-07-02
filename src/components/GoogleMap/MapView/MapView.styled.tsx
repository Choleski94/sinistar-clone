import { styled } from '@mui/system';

interface IStyler {
	visibility: string;
}

interface IElementStyle {
	featureType: string;
	elementType: string;
	stylers: IStyler[];
}

export const StyledMapViewContainer = styled('div')({
	width: '100%',
	height: '100%',
	cursor: 'grab',
	outline: 'none',
	userSelect: 'none',
	touchAction: 'none',
	position: 'relative',
	WebkitUserDrag: 'none',
	WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
});

export const configMapView: IElementStyle[] = [
	{
		featureType: 'poi.attraction',
		elementType: 'all',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi.attraction',
		elementType: 'labels',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi.attraction',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'simplified'
			}
		]
	},
	{
		featureType: 'poi.business',
		elementType: 'all',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi.business',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi.government',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi.medical',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi.place_of_worship',
		elementType: 'labels',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi.place_of_worship',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi.school',
		elementType: 'labels',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi.school',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi.sports_complex',
		elementType: 'labels',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi.sports_complex',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	}
];

