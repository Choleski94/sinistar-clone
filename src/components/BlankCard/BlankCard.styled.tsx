import { styled } from '@mui/system';
import { Paper } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	borderRadius: '16px',
	height: '100%',
}));

