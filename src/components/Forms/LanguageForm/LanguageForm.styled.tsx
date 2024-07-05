import { styled } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';

export const DefaultBox = styled('div')({
	marginBottom: '16px',
});

export const LanguageTitle = styled(Typography)({
	color: '#000',
	display: 'block',
	fontWeight: 'bold',
	marginRight: '8px',
});

export const CountryTitle = styled(Typography)({
	color: '#667085',
	display: 'block',
});

export const ButtonsContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	gap: '18px',
});

export const LanguageButton = styled(Button)(({ selected }) => ({
	color: '#000',
	padding: '8px',
	textAlign: 'center',
	borderRadius: '8px',
	textDecoration: 'none',
	backgroundColor: 'transparent',
	border: selected ? '2px solid #000' : 'none',
	'&:hover': {
		border: '2px solid #000',
		paddingTop: selected ? '8px' : '6px',
		paddingBottom: selected ? '8px' : '6px',
	}
}));

