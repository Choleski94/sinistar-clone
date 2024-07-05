import React from 'react';

interface IWithErrorHandlingProps {
	errorMessage: string | null;
	clearError: () => void;
}

interface IWithErrorHandlingOptions {
	isDev?: boolean;
}

const withErrorHandling = (
	WrappedComponent: React.ComponentType<T & IWithErrorHandlingProps>,
	options: IWithErrorHandlingOptions = {}
) => {
	const { isDev = false } = options;

	const WithErrorHandling = (props: T) => {
		const [ errorMessage, setErrorMessage ] = React.useState<string | null>(null);

		const clearError = () => {
			setErrorMessage(null);
		};

		React.useEffect(() => {
			const componentDidCatch = (error: Error) => {
				if (isDev) {
					console.error('Error caught:', error);
				}
				setErrorMessage(error.message);
			};

			return () => {
				// Clean up componentDidCatch effect
			};
		}, [ isDev ]);

		return (
			<WrappedComponent
				{...props}
				clearError={clearError}
				errorMessage={errorMessage}
			/>
		);
	};

	WithErrorHandling.defaultName = 'WithErrorHandling';

	return WithErrorHandling;
};

export default withErrorHandling;

