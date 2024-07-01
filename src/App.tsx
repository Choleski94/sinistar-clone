import React from 'react';
import { IntlProvider } from 'react-intl';

import { Search } from './screens';
import { useStore } from './store';
import { getLocale, constructLocale, SUPPORTED_LOCALES } from './locales';

const App = () => {
	const { state, dispatch } = useStore();

	const localeISO = constructLocale(state.locale);
	const localeMessage = getLocale(localeISO);
	
	return (
		<IntlProvider 
			key={localeISO} 
			locale={localeISO} 
			messages={localeMessage}
			supportedLocales={SUPPORTED_LOCALES}
		>
			<Search />
		</IntlProvider>
	);
}

export default App
