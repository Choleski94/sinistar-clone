import { useIntl } from 'react-intl';

import enUS from '../locales/lang/en/US.json';

interface IMessages {
	[key: string]: string;
}
  
const formatMessage = (id: string = '', values: {[key: string]: string} = {}) => {
	const intl = useIntl();
	const defaultMessage = (enUS as IMessages)[id] || '';
	return intl.formatMessage({ id, defaultMessage }, values);
}

export default formatMessage
