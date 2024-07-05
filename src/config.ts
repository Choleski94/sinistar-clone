interface IAppConfig {
	env: string;
}

interface IServicesConfig {
	googleMap: string | undefined;
}

interface IConfig {
	app: IAppConfig;
	services: IServicesConfig;
}


const config: IConfig = {
	app: {
		env: import.meta.env.APP_ENV || 'development',
	},
	services: {
		googleMap: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
	},
};

export default config;

