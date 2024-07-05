import {
	Fade,
	Backdrop,
	Typography,
	IconButton,
	Modal as MuiModal,
	useMediaQuery,
} from '@mui/material';
import React from 'react';
import { Close as CloseIcon } from '@mui/icons-material';

import { getResponsiveSize } from './Modal.controller';
import { StyledBox, Header, ContentBox } from './Modal.styled';

interface IModalProps {
	title?: string;
	open?: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
	size?: Record<string, number>;
}

const Modal: React.FC<IModalProps> = ({
	title = '',
	size = 'md',
	open = false,
	children = null,
	onClose = () => null,
}) => {
	const isMobile = useMediaQuery('(max-width:600px)');

	if (!open) return null;

	return (
		<MuiModal
			open
			BackdropProps={{
				timeout: 1500,
			}}
			onClose={onClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
		>
			<Fade in={true}>
				<StyledBox size={size} $isMobile={isMobile}>
					<Header>
						<Typography variant="h6" component="h2">
							{title}
						</Typography>
						<IconButton aria-label="close" onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</Header>
					<ContentBox>
						{children}
					</ContentBox>
				</StyledBox>
			</Fade>
		</MuiModal>
	);
};

export default Modal;

