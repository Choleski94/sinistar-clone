import { styled } from '@mui/system';
import { Card, CardContent, CardMedia } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
	display: 'flex',
	padding: '16px',
	boxShadow: 3,
	marginBottom: '24px',
	borderRadius: '16px',
	flexDirection: 'column',
	border: '1px solid #e5e7eb',
	transition: 'transform 0.2s, box-shadow 0.2s',
	'&:hover': {
		boxShadow: 6,
		transform: 'scale(1.01)',
	},
	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
	},
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
	width: '100%',
	height: '15rem',
	flexShrink: 0,
	borderRadius: '16px',
	marginBottom: '16px',
	[theme.breakpoints.up('sm')]: {
		height: '20rem',
	},
	[theme.breakpoints.up('md')]: {
		height: '14rem',
		width: '20rem',
		marginBottom: 0,
	},
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
	flexGrow: 1,
	paddingLeft: 0,
	[theme.breakpoints.up('md')]: {
		paddingLeft: '24px',
	},
}));

