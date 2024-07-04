import React from 'react';
import { IntlProvider } from 'react-intl';

import { Search } from './screens';
import { useStore } from './store';
import { Layout } from './components';
import { withGoogleMapServices } from './utils/hocs';
import { getLocale, constructLocale, SUPPORTED_LOCALES } from './locales';

const GOOGLE_MAP_API_KEY = 'PUT_YOUR_API_TOKEN';

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
			<Layout>
				<Search />
			</Layout>
		</IntlProvider>
	);
}

export default withGoogleMapServices(App, GOOGLE_MAP_API_KEY);
