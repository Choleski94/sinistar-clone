import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

export const Container = styled('div')({
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: 999,
});

export const InnerContainer = styled('div')({
	background: '#ffffff',
	padding: '16px',
	minWidth: '320px',
	maxWidth: '400px',
	borderRadius: '8px',
	boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

export const CloseButton = styled(Button)({
	position: 'absolute',
	top: '8px',
	right: '8px',
});

export const DefaultBox = styled('div')({
	marginBottom: '16px',
});

export const Title = styled(Typography)({
	fontWeight: 'bold',
	marginBottom: '30px',
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

