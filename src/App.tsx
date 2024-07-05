import React from 'react';
import { IntlProvider } from 'react-intl';

import config from '@config';
import { Search } from '@screens';
import { useStore } from '@store';
import { Layout } from '@components';
import { withGoogleMapServices, withErrorHandling } from '@utils/hocs';
import { getLocale, constructLocale, SUPPORTED_LOCALES } from '@locales';

const isDev = config.app.env === 'development';

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

export default withErrorHandling(withGoogleMapServices(App, config.services.googleMap), { isDev });
