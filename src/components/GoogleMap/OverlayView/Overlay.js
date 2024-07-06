export const createOverlay = (container, pane, position, getPixelPositionOffset) => {
	class Overlay extends google.maps.OverlayView {
		constructor(
			container,
			pane,
			position,
			getPixelPositionOffset
		) {
			super();
			this.pane = pane;
			this.position = position;
			this.container = container;
			this.getPixelPositionOffset = getPixelPositionOffset;
		}

		onAdd() {
			const pane = this.getPanes()?.[this.pane];
			pane?.appendChild(this.container);
		}

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

		onRemove() {
			if (this.container.parentNode !== null) {
				this.container.parentNode.removeChild(this.container);
			}
		}
	}

	return new Overlay(container, pane, position, getPixelPositionOffset);
}
