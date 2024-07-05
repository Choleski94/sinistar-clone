import {
	List, 
	Popover, 
	ListItem,
	TextField, 
	Typography, 
	InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon } from '@mui/icons-material';

interface IStyledPopoverProps {
	$width?: number | null;
	$inputRect?: DOMRect | null;
}

export const SearchLocationWrapper = styled('div')`
	position: relative;
`;

export const StyledPopover = styled(Popover)<IStyledPopoverProps>(({ $top, $width }) => ({
	left: 0,
	top: $top ? $top + 15 : 'unset',
	'& .MuiPaper-root': {
		width: $width || 'unset',
	},
}));

export const StyledList = styled(List)({
	paddingTop: 0,
});

export const StyledListItem = styled(ListItem)({
	paddingTop: 5,
	paddingBottom: 5,
});

export const StyledTypography = styled(Typography)({
	paddingRight: 5,
	fontWeight: 'bold', 
});

export const StyledMutedTypography = styled(Typography)({
	fontWeight: 'normal', 
});

export const StyledHeaderTypography = styled(Typography)({
	fontWeight: 'bold', 
	padding: '10px 10px 0px 10px',
});

export const StyledTextField = styled(TextField)({
	'& .MuiInputBase-root': {
		borderRadius: '8px',
		backgroundColor: '#fff',
		'&:hover': {
			backgroundColor: '#fff',
		},
		// Custom input border color when focused.
		'&.Mui-focused': {
			borderColor: '#edcc1f',
			backgroundColor: '#fff',
			boxShadow: '0 0 0 0 rgba(16, 24, 40, .05)',
		},
		"&.MuiOutlinedInput-root": {
			"&.Mui-focused fieldset": {
				borderColor: '#edcc1f',
			}
		}
	},
});

export const StyledInputAdornment = styled(InputAdornment)({
	height: 30,
	padding: 8,
	display: 'flex',
	borderRadius: 50,
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#edcc1f',
});

export const StyledSearchIcon = styled(SearchIcon)({
	width: 16,
});
