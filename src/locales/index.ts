'use strict';

import enUS from './lang/en/US.json';
import frCA from './lang/fr/CA.json';
import esES from './lang/es/ES.json';

import { ILocaleObject, IConstructLocaleObject } from './types';

export const localesObj: ILocaleObject = {
	en: {
		US: enUS,
	},
	fr: {
		CA: frCA
	},
	es: {
		ES: esES
	},
};

export const DEFAULT_LANG: string = 'en';

export const DEFAULT_COUNTRY: string = 'US';

export const LOCALE_QUERY: string = 'locale.x';

export const LOCALE_KEY: string = 'sinistar_locale';

export const DEFAULT_LOCALE = [
	DEFAULT_LANG, 
	DEFAULT_COUNTRY
].join('-');

export const DEFAULT_LOCALE_OBJ: { [key: string]: IConstructLocaleObject; } = {
	locale: {
		lang: DEFAULT_LANG, 
		country: DEFAULT_COUNTRY
	}
};

export const LOCALE_INFO: { [key: string]: IConstructLocaleObject; } = {
	'en-US': {
		lang: 'English',
		country: 'United States',
	},
	'fr-CA': {
		lang: 'Français',
		country: 'Canada',
	},
	'es-ES': {
		lang: 'Español',
		country: 'Espana',
	},
};

export const SUPPORTED_LOCALES: { [key: string]: string; } = {
	en: 'en-US',
	fr: 'fr-CA',
	es: 'es-ES',
};

export const FALLBACK_LOCALES: { [key: string]: string; } = {
	en: 'US',
	fr: 'CA',
	es: 'ES',
};

export const constructLocale = ({ lang = '', country = '' }: IConstructLocaleObject, withUnderscore: boolean = false): string => [
	(lang || '').toLowerCase(), 
	(country || '').toUpperCase()
].join(withUnderscore ? '_' : '-');

export const parseLocale = (locale: string = '', construct: boolean = false): string | IConstructLocaleObject => {
	let res: string | IConstructLocaleObject = '';

	if (locale && locale.length) {
		const parsedLocale = (locale || '').replace('_', '-');
		const [ lang, country ] = parsedLocale.split('-');

		const payload: IConstructLocaleObject = {
			lang: (lang || '').toLowerCase(), 
			country: (country || '').toUpperCase(),
		};

		res = construct ? payload : constructLocale(payload);
	}

	return res;
};

export const getLocale = (locale: string = ''): { [key: string]: string } => {
	const { lang, country } = parseLocale(locale, true) as IConstructLocaleObject;

	let res = localesObj[DEFAULT_LANG][DEFAULT_COUNTRY];

	const localeLang = localesObj[lang];

	if (localeLang) {
		const tmpLangCountry = localeLang[country];

		if (tmpLangCountry) {
			res = tmpLangCountry
		} else {
			res = localeLang[FALLBACK_LOCALES[lang]];
		}
	}

	return res;
};

export default {
	getLocale,
	LOCALE_KEY,
	LOCALE_INFO,
	parseLocale,
	LOCALE_QUERY,
	DEFAULT_LOCALE,
	DEFAULT_LOCALE_OBJ,
};

