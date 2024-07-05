import React from 'react';
import { Status, Wrapper } from '@googlemaps/react-wrapper';

interface IWithGoogleMapServicesProps {
	apiKey?: string;
	[key: string]: any;
	libraries?: string[];
}

const GOOGLE_MAP_SERVICES = ['places'];

const render = (statusCode?: string) => {
	if (statusCode === Status.FAILURE) {
		return <p>Failed</p>
	}
	return <p>loading...</p>
}

const withGoogleMapServices = (
	Component: React.ComponentType<any> | null = null,
	GOOGLE_MAP_API_KEY: string = ''
) => {
	const WithGoogleMapServices: React.FC<IWithGoogleMapServicesProps> = ({
		apiKey = GOOGLE_MAP_API_KEY, 
		libraries = GOOGLE_MAP_SERVICES, 
		...rest
	}) => (
		<Wrapper apiKey={apiKey} libraries={libraries} render={render}>
			<Component {...rest} />
		</Wrapper>
	);

	return WithGoogleMapServices;
}

withGoogleMapServices.defaultName = 'withGoogleMapServices';

export default withGoogleMapServices;
