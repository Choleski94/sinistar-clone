'use strict';

import enUS from './lang/en/US.json';
import frFR from './lang/fr/FR.json';
import esES from './lang/es/ES.json';
import zhCN from './lang/zh/CN.json';
import ruRU from './lang/ru/RU.json';

interface ILocaleObject {
	[key: string]: {
		[key: string]: Record<string, string>;
	};
}

interface IConstructLocaleObject {
	lang?: string; 
	country?: string
}

export const localesObj: ILocaleObject = {
	en: {
		US: enUS,
	},
	fr: {
		FR: frFR
	},
	es: {
		ES: esES
	},
	zh: {
		CN: zhCN
	},
	ru: {
		RU: ruRU
	}
};

export const DEFAULT_LANG = 'en';

export const DEFAULT_COUNTRY = 'US';

export const LOCALE_QUERY = 'locale.x';

export const LOCALE_KEY = 'sinistar_locale';

export const DEFAULT_LOCALE = [
	DEFAULT_LANG, 
	DEFAULT_COUNTRY
].join('-');

export const DEFAULT_LOCALE_OBJ = {
	locale: {
		lang: DEFAULT_LANG, 
		country: DEFAULT_COUNTRY
	}
};

export const SUPPORTED_LOCALES: Record<string, string> = {
	en: 'en-US',
	fr: 'fr-FR',
	es: 'es-ES',
	zh: 'zh-CN',
	ru: 'ru-RU',
};

export const FALLBACK_LOCALES: Record<string, string> = {
	en: 'US',
	fr: 'FR',
	es: 'ES',
	zh: 'CN',
	ru: 'RU',
};

export const constructLocale = ({ lang = '', country = '' }: IConstructLocaleObject, withUnderscore?: boolean = false) => [
	(lang || '').toLowerCase(), 
	(country || '').toUpperCase()
].join(withUnderscore ? '_' : '-');

export const parseLocale = (locale: string = '', construct?: boolean = false): string | null => {
	let res = null;

	if (locale && locale.length) {
		const parsedLocale = (locale || '').replace('_', '-');
		const [ lang, country ] = parsedLocale.split('-');

		const payload = {
			lang: (lang || '').toLowerCase(), 
			country: (country || '').toUpperCase(),
		};

		res = construct ? payload : constructLocale(payload);
	}

	return res;
};

export const getLocale = (locale: string = ''): Record<string, string> => {
	const { lang, country } = parseLocale(locale, true);

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
	parseLocale,
	LOCALE_QUERY,
	DEFAULT_LOCALE,
	DEFAULT_LOCALE_OBJ,
};
