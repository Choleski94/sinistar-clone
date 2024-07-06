import React from 'react';

import { IScrollbarProps } from './types';
import { ScrollbarDiv, ScrollbarContent } from './Scrollbar.styled';

const Scrollbar: React.FC<IScrollbarProps> = ({
	children, 
	withoutScroll = false,
}) => (
	<ScrollbarDiv withoutScroll={withoutScroll}>
		<ScrollbarContent>
			{children}
		</ScrollbarContent>
	</ScrollbarDiv>
);

export default Scrollbar;

