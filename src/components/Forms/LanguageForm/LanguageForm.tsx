import React from 'react';

import { useStore } from '@store';
import { IConstructLocaleObject } from '@locales/types';
import { LOCALE_INFO, SUPPORTED_LOCALES, constructLocale, parseLocale } from '@locales';

import {
	DefaultBox,
	CountryTitle,
	LanguageTitle,
	LanguageButton,
	ButtonsContainer,
} from './LanguageForm.styled';

interface ILanguageFormProps {
	onSubmit?: (locale: IConstructLocaleObject) => void;
}

const LanguageForm: React.FC<ILanguageFormProps> = ({
	onSubmit = () => null,
}) => {
	const { state } = useStore();

	const [ activeLocale, setActiveLocate ] = React.useState<string>('');

	const currentLocale = React.useMemo(() => (
		constructLocale(state?.locale)
	), [ state?.locale ]);

	React.useMemo(() => {
		if (currentLocale === activeLocale) return
		setActiveLocate(currentLocale);	
	}, [ currentLocale ]);

	const handleLanguageSet = (localeISO: string) => {
		onSubmit(parseLocale(localeISO, true) as IConstructLocaleObject);
	}

	return (
		<DefaultBox>
			<ButtonsContainer>
				{Object.values(SUPPORTED_LOCALES as { [key: string]: string; }).map((localeISO) => (
					<LanguageButton 
						key={localeISO}
						hrefLang={localeISO} 
						selected={localeISO === activeLocale}
						onClick={() => handleLanguageSet(localeISO)}
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
	);
};

export default LanguageForm;

