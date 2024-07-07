import { styled } from '@mui/material/styles';
import { Button, Typography, TextField } from '@mui/material';

export const CriterionContainer = styled('div')({
	padding: '20px',
});

export const SliderContainer = styled('div')({
	marginBottom: '16px',
	'& .MuiSlider-root': {
		color: '#858181',
	},
	'& .MuiSlider-thumb': {
		color: '#edcc1f',
	},
});

export const SliderHeader = styled(Typography)({
	paddingBottom: 12
});

export const FullWidthButton = styled(Button)({
	width: '100%',
	color: '#000',
	borderRadius: '8px',
	padding: '15px 10px',
	border: '1px solid #000',
	background: 'transparent',
	'&:hover': {
		background: 'transparent',
	},
});

export const StyledTextField = styled(TextField)(({ error }) => ({
	'& input': {
		padding: '10px 14px',
		borderColor: error ? 'red' : 'inherit',
	}
}))
