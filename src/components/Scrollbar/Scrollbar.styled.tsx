import { styled } from '@mui/material/styles';

export const ScrollbarDiv = styled('div')<{ $withoutScroll: boolean }>(({ $withoutScroll }) => ({
	width: '100%',
	height: $withoutScroll ? '100%' : 'calc(60vh + 45px)',
	overflowY: 'auto',
	scrollbarWidth: 'thin',
	scrollbarColor: '#edcc1f #E0E0E0', // Firefox
	'&::-webkit-scrollbar': {
		width: '8px',
	},
	'&::-webkit-scrollbar-track': {
		background: '#E0E0E0',
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: '#edcc1f',
		borderRadius: '10px',
		border: '2px solid #E0E0E0',
	},
	'&::-webkit-scrollbar-thumb:hover': {
		backgroundColor: '#edcc1f',
	},
}));

export const ScrollbarContent = styled('div')({
	padding: '16px',
	lineHeight: '1.5',
});

