import React from 'react';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';

import Suggestions from './Suggestions';
import InputWithIcon from './InputWithIcon';
import formatMessage from '../../utils/formatMessage';
import { SearchLocationWrapper } from './SearchLocation.styled';

interface ISearchLocationProps {
	label?: string;
		placeholder?: string;
	defaultValue?: string;
	onSelect?: (geoPayload: google.maps.GeocoderResult[]) => void;
}

/**
 * A search location input component that integrates with Google Places Autocomplete.
 */
export const SearchLocation: React.FC<ISearchLocationProps> = ({
	label = '',
	defaultValue = '',
	onSelect = () => null,
}) => {
	const {
		value, setValue, clearSuggestions,
		suggestions: { status, data: options },
	} = usePlacesAutocomplete();

	const textFieldRef = React.useRef<HTMLInputElement>(null);

	const [ isApiLoaded, setIsApiLoaded ] = React.useState(false);
	const [ popoverTop, setPopoverTop ] = React.useState<number | null>(null);
	const [ popoverWidth, setPopoverWidth ] = React.useState<number | null>(null);

	const messages = {
		placeholder: formatMessage('header.search.text'),
		resultText: formatMessage('header.search.result.text'),
	}

	const open = React.useMemo(() => Boolean(
		status === 'OK' && options && options?.length
	), [ status, options ]);

	// Check if Google Maps API is loaded.
	React.useEffect(() => {
		if (
			window?.google && 
			window?.google?.maps && 
			window?.google?.maps?.places
		) {
			setIsApiLoaded(true);
		}
	}, []);

	// Set default value if provided.
	React.useEffect(() => {
		if (defaultValue && !value) {
			setValue(defaultValue, false);
		}
	}, [ defaultValue ]);

	// Handle resize event to adjust popover position.
	const handleResize = React.useCallback(() => {
		if (!textFieldRef?.current) return;

		const width = textFieldRef.current.offsetWidth;
		if (width !== popoverWidth) setPopoverWidth(width);

		const { bottom } = textFieldRef.current.getBoundingClientRect();
		if (bottom !== popoverTop) setPopoverTop(bottom);
	}, [ popoverWidth, popoverTop ]);

	React.useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [ handleResize ]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		handleResize();
	};

	const handleClose = () => {
		setValue('', false);
		clearSuggestions();
	}

	// Handle selection from autocomplete suggestions.
	const handleSelect = async (placePayload: google.maps.places.AutocompletePrediction) => {
		const [ geoPayload ] = await getGeocode({
			address: placePayload?.description
		});

		setValue(geoPayload?.formatted_address, false);
		clearSuggestions();
		onSelect(geoPayload);
	};

	if (!isApiLoaded) return null;

	return (
		<SearchLocationWrapper>
			<InputWithIcon
				value={value}
				ref={textFieldRef}
				onChange={handleInputChange}
				placeholder={messages.placeholder}
			/>
			<Suggestions
				open={open}
				top={popoverTop}
				options={options}
				width={popoverWidth}
				handleClose={handleClose}
				handleSelect={handleSelect}
				resultText={messages.resultText}
				anchorEl={textFieldRef?.current}
			/>
		</SearchLocationWrapper>
	);
};

SearchLocation.displayName = 'SearchLocation';

export default SearchLocation;

