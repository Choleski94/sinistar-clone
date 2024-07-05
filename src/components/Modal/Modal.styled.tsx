import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { getResponsiveSize } from './Modal.controller';

interface IStyledBoxProps {
	isMobile: boolean;
	size: keyof typeof DEFAULT_MODAL_SIZES;
}

export const StyledBox = styled(Box)<IStyledBoxProps>(({ size, $isMobile }) => ({
	top: '50%',
	left: '50%',
	outline: 'none',
	borderRadius: '8px',
	position: 'absolute',
	padding: '16px 20px',
	backgroundColor: '#fff',
	transform: 'translate(-50%, -50%)',
	width: getResponsiveSize(size, $isMobile),
}));

export const Header = styled('div')({
	display: 'flex',
	alignItems: 'center',
	marginBottom: '16px',
	justifyContent: 'space-between',
});

export const ContentBox = styled(Box)({
	marginTop: '16px',
});

