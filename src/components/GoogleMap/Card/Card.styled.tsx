import { styled } from '@mui/material/styles';
import { Paper, Rating as MUIRating } from '@mui/material';

export const Container = styled(Paper)({
	zIndex: 250,
	maxWidth: 250,
	borderRadius: 10,
	overflow: 'hidden',
	position: 'absolute',
	transform: 'translate(-99px, -305px)',
});

export const RatingContainer = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
});

export const Rating = styled(MUIRating)({
	'& .MuiRating-iconFilled': {
		color: '#232323',
	},
});
