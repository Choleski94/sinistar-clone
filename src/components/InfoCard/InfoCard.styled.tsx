import { styled } from '@mui/system';
import { CardMedia, Box, Typography } from '@mui/material';

export const StyledCardMedia = styled(CardMedia)({
	width: '100%',
	flexShrink: 0,
	height: '15rem',
	marginBottom: '16px',
});

export const StyledInfoBox = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
});

export const StyledTypography = styled(Typography)({
	fontSize: '0.9rem',
});