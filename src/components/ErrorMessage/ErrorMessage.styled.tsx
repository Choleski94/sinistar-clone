import { styled } from '@mui/system';
import { Typography, Button, Box } from '@mui/material';

export const StyledBox = styled(Box)({
    padding: 16,
    color: '#fff',
    display: 'flex',
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#f64f64',
});

export const StyledTypography = styled(Typography)({
    flexGrow: 1,
    marginLeft: 16,
});

export const StyledButton = styled(Button)({
    border: '1 px solid #fff'
});
