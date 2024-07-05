import types from './../types';

import { IConstructLocaleObject } from '@locales/types';

/**
 * Action creator for setting locale.
 * @param {Object} localeObj - Object containing lang and country properties.
 * @param {string} localeObj.lang - The language code.
 * @param {string} localeObj.country - The country code.
 * @returns {Object} Action object for setting locale.
 */
const localeSet = ({ lang, country }: IConstructLocaleObject) => ({
	type: types.LOCALE_SET,
	lang, 
	country,
});

/**
 * Action creator that calls localeSet to set locale.
 * @param {Object} localeObj - Object containing lang and country properties.
 * @returns {Object} Action object for setting locale.
 */
const setLocale = (localeObj: IConstructLocaleObject) => localeSet(localeObj);

export default {
	setLocale,
};
