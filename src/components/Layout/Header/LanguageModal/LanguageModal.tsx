import React from 'react';

import {
	Title,
	Container,
	DefaultBox,
	CloseButton,
	CountryTitle,
	LanguageTitle,
	InnerContainer,
	LanguageButton,
	ButtonsContainer,
} from './LanguageModal.styled';
import { useStore } from '../../../../store';
import { LOCALE_INFO, SUPPORTED_LOCALES, constructLocale, parseLocale } from '../../../../locales';

const LanguageModal = ({
	onClose = () => null,
}) => {
	const { state, dispatch, actions } = useStore();

	const [ activeLocale, setActiveLocate ] = React.useState();

	const currentLocale = React.useMemo(() => (
		constructLocale(state?.locale)
	), [ state?.locale ]);

	React.useMemo(() => {
		if (currentLocale === activeLocale) return
		setActiveLocate(currentLocale);	
	}, [ currentLocale ]);

	const handleLanguageSet = (e, localeISO: string) => {
		e.stopPropagation();
		dispatch(actions.setLocale(parseLocale(localeISO, true)));
	}

	return (
		<Container tabIndex={-1} onClick={onClose}>
			<InnerContainer onClick={(e) => e.stopPropagation()}>
				<CloseButton onClick={onClose}>
					<svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#101828">
						<path d="M18 6L6 18M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</CloseButton>
				<DefaultBox>
					<Title variant="subtitle1">
						Select your preferred language
					</Title>
					<ButtonsContainer>
						{Object.values(SUPPORTED_LOCALES).map((localeISO) => (
							<LanguageButton 
								key={localeISO}
								hreflang={localeISO} 
								selected={localeISO === activeLocale}
								onClick={(e) => handleLanguageSet(e, localeISO)}
							>
								<LanguageTitle>
									{LOCALE_INFO[localeISO]?.lang}
								</LanguageTitle>
								<br />
								<CountryTitle>
									{LOCALE_INFO[localeISO]?.country}
								</CountryTitle>
							</LanguageButton>
						))}
					</ButtonsContainer>
				</DefaultBox>
			</InnerContainer>
		</Container>
	);
};

export default LanguageModal;

