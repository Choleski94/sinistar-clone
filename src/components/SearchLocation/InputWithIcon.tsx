import React from 'react';

import {
	StyledTextField,
	StyledSearchIcon,
	StyledInputAdornment,
} from './SearchLocation.styled';

interface IInputWithIconProps {
	value?: string;
	placeholder?: string;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

/**
 * InputWithIcon component with an icon at the end of the input field.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.value=''] - The value of the input field.
 * @param {string} [props.placeholder=''] - The placeholder text for the input field.
 * @param {function} [props.onChange=() => null] - The function to call when the input value changes.
 * @param {React.Ref} ref - The reference to the input field.
 * @returns {React.Element} The InputWithIcon component.
 */
export const InputWithIcon = React.forwardRef<HTMLInputElement, IInputWithIconProps>(({
	value = '', 
	placeholder = '', 
	onChange = () => null
}, ref) => (
	<StyledTextField
		fullWidth
		type="text"
		size="small"
		value={value}
		autoComplete="off"
		onChange={onChange}
		placeholder={placeholder}
		InputProps={{
			endAdornment: (
				<StyledInputAdornment position="end">
					<StyledSearchIcon />
				</StyledInputAdornment>
			),
		}}
		ref={ref}
	/>
));

InputWithIcon.displayName = 'InputWithIcon';

export default InputWithIcon;

