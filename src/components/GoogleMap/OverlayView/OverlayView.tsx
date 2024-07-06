import React from 'react';
import { createPortal } from 'react-dom';

import { createOverlay } from './Overlay';
import { IOverlayViewProps } from './types';

/**
 * OverlayView component renders children within a positioned overlay container on a map view.
 * @param {Object} props - Component props.
 * @param {google.maps.Map} props.mapView - Google Map instance to attach the overlay to.
 * @param {number} props.zIndex - Z-index of the overlay container.
 * @param {React.ReactNode} props.children - Children elements to render within the overlay.
 * @param {google.maps.LatLng | google.maps.LatLngLiteral} props.position - Position of the overlay on the map.
 * @param {string} [props.pane='floatPane'] - Pane to attach the overlay to.
 * @returns {React.ReactPortal} Rendered overlay portal.
 */
const OverlayView: React.FC<IOverlayViewProps> = ({ mapView, zIndex, children, position, pane = 'floatPane' }) => {
	const container = React.useMemo(() => {
		const div = document.createElement('div');
		div.style.position = 'absolute';
		return div;
	}, []);

	/**
	 * Calculates the pixel offset for positioning based on the width and height.
	 * @param {number} width - Width of the overlay.
	 * @param {number} height - Height of the overlay.
	 * @returns {{ x: number, y: number }} Pixel offset.
	 */
	const getPixelPositionOffset = React.useCallback((width: number, height: number) => ({
		x: -width / 2,
		y: -height
	}), []);

	const overlay = React.useMemo(() => {
		return createOverlay(container, pane, position, getPixelPositionOffset);
	}, [ container, pane, position]);

	React.useEffect(() => {
		overlay?.setMap(mapView);
		return () => overlay?.setMap(null);
	}, [ mapView, overlay ]);

	React.useEffect(() => {
		container.style.zIndex = `${zIndex}`;
	}, [ zIndex, container ]);

	return createPortal(children, container);
}

export default OverlayView;
