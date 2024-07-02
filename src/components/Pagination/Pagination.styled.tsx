import { styled } from '@mui/material/styles';
import { Stack, PaginationItem } from '@mui/material';

export const CenteredStack = styled(Stack)({
	display: 'flex',
	paddingTop: '20px',
	alignItems: 'center',
	justifyContent: 'center',
});

export const StyledPaginationItem = styled(PaginationItem)({
	'&.Mui-selected': {
		color: '#edcc1f',
		backgroundColor: '#f8eba5',
	},
	'&.Mui-selected:hover': {
		color: '#edcc1f',
		backgroundColor: '#f8eba5',
		boxShadow: '0 0 0 4px #f6e68f',
	},
});

