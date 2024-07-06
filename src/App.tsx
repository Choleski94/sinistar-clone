import { IntlProvider } from 'react-intl';

import config from '@config';
import { Search } from '@screens';
import { useStore } from '@store';
import { Layout } from '@components';
import { getLocale, constructLocale } from '@locales';
import { withGoogleMapServices, withErrorHandling } from '@utils/hocs';

const isDev = config.app.env === 'development';

const App = () => {
	const { state } = useStore();

	const localeISO = constructLocale(state.locale);
	const localeMessage = getLocale(localeISO);

	return (
		<IntlProvider 
			key={localeISO} 
			locale={localeISO} 
			messages={localeMessage}
		>
			<Layout>
				<Search />
			</Layout>
		</IntlProvider>
	);
}

export default withErrorHandling(withGoogleMapServices(App, config.services.googleMap), { isDev });
