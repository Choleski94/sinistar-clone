/// <reference types="google.maps" />

interface IPixelPositionOffset {
	(width: number, height: number): { x: number; y: number };
}

/**
 * Creates an overlay for a Google Map.
 *
 * @param {HTMLElement} container - The container element for the overlay.
 * @param {string} pane - The pane where the overlay will be rendered.
 * @param {google.maps.LatLng} position - The position on the map where the overlay will be displayed.
 * @param {function(number, number): {x: number, y: number}} getPixelPositionOffset - A function that returns the offset of the overlay in pixels.
 * @returns {google.maps.OverlayView} A new instance of the Overlay class.
 */
export const createOverlay = (
	container: HTMLElement,
	pane: string,
	position: google.maps.LatLng,
	getPixelPositionOffset: IPixelPositionOffset
) => {
	class Overlay extends google.maps.OverlayView {
		/**
		 * Constructs an instance of the Overlay class.
		 *
		 * @param {HTMLElement} container - The container element for the overlay.
		 * @param {string} pane - The pane where the overlay will be rendered.
		 * @param {google.maps.LatLng} position - The position on the map where the overlay will be displayed.
		 * @param {function(number, number): {x: number, y: number}} getPixelPositionOffset - A function that returns the offset of the overlay in pixels.
		 */
		constructor(
			container: HTMLElement,
			pane: string,
			position: google.maps.LatLng,
			getPixelPositionOffset: IPixelPositionOffset
		) {
			super();

			this.pane = pane;
			this.position = position;
			this.container = container;
			this.getPixelPositionOffset = getPixelPositionOffset;
		}

		/**
		 * Called when the overlay is added to the map.
		 */
		onAdd() {
			const pane = this.getPanes()?.[this.pane];
			pane?.appendChild(this.container);
		}

		/**
		 * Called when the overlay needs to draw itself.
		 */
		draw() {
			const projection = this.getProjection();
			const point = projection.fromLatLngToDivPixel(this.position);

			if (point === null) {
				return;
			}

			// this.container.style.transform = `translate(${point.x}px, ${point.y}px)`;
			const { offsetWidth, offsetHeight } = this.container;
			const offset = this.getPixelPositionOffset(offsetWidth, offsetHeight);
			const x = point.x + offset.x;
			const y = point.y + offset.y;

			this.container.style.transform = `translate(${x}px, ${y}px)`;
		}

		/**
		 * Called when the overlay is removed from the map.
		 */
		onRemove() {
			if (this.container.parentNode !== null) {
				this.container.parentNode.removeChild(this.container);
			}
		}
	}

	return new Overlay(container, pane, position, getPixelPositionOffset);
}
