import React from 'react';
import { Close as CloseIcon, Error as ErrorIcon } from '@mui/icons-material';

import { StyledBox, StyledTypography, StyledButton } from './ErrorMessage.styled';

interface IErrorMessageProps {
    message: string;
    onDismiss: () => void;
}

/**
 * ErrorMessage component displaying an error message with dismiss functionality.
 * @param {ErrorMessageProps} props - Component props.
 * @returns {JSX.Element} Rendered component.
 */
const ErrorMessage: React.FC<IErrorMessageProps> = ({ message, onDismiss }) => (
    <StyledBox>
        <ErrorIcon fontSize="large" />
        <StyledTypography variant="body1">
            {message}
        </StyledTypography>
        <StyledButton
            size="small"
            color="inherit"
            onClick={onDismiss}
        >
            <CloseIcon fontSize="large" />
        </StyledButton>
    </StyledBox>
);

export default ErrorMessage;
