export interface ILocaleObject {
	[key: string]: {
		[key: string]: Record<string, string>;
	};
}

export interface IConstructLocaleObject {
	lang: string; 
	country: string
}