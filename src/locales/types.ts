export interface ILocaleObject {
	[key: string]: {
		[key: string]: { [key: string]: string; };
	};
}

export interface IConstructLocaleObject {
	lang: string; 
	country: string
}