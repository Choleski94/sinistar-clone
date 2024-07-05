import React from 'react';

import {
	StyledList,
	StyledPopover,
	StyledListItem,
	StyledTypography,
	StyledMutedTypography,
	StyledHeaderTypography,
} from './SearchLocation.styled';

interface IPlacePayload {
	place_id: string;
	structured_formatting: {
		main_text: string;
		secondary_text?: string;
	};
}

interface ISuggestionsProps {
	top?: number;
	width?: number;
	open?: boolean;
	resultText?: string;
	handleClose?: () => void;
	options?: IPlacePayload[];
	anchorEl?: HTMLElement | null;
	handleSelect?: (placePayload: IPlacePayload) => void;
}

/**
 * Component to render a popover with place suggestions.
 */
export const Suggestions: React.FC<ISuggestionsProps> = ({
	top = 0,
	width = 0,
	open = false,
	options = [],
	resultText = '',
	anchorEl = null,
	handleClose = () => null,
	handleSelect = () => null,
}) => {
	if (!open) return null;

	return (
		<StyledPopover
			$top={top}
			open={open}
			$width={width}
			disableAutoFocus
			anchorEl={anchorEl}
			disableEnforceFocus
			onClose={handleClose}
		>
			<StyledHeaderTypography variant="body1">
				{resultText}
			</StyledHeaderTypography>
			<StyledList>
				{options.map((placePayload) => (
					<StyledListItem
						button key={placePayload?.place_id} 
						onClick={() => handleSelect(placePayload)}
					>
						<StyledTypography variant="body1" component="span">
							{placePayload?.structured_formatting?.main_text}
						</StyledTypography>
						<StyledMutedTypography variant="body2" component="small">
							{placePayload?.structured_formatting?.secondary_text}
						</StyledMutedTypography>
					</StyledListItem>
				))}
			</StyledList>
		</StyledPopover>
	);
};

export default Suggestions;

