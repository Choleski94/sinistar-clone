import React from 'react';
import { Box } from '@mui/material';

import { ErrorMessage } from '@components';

interface IWithErrorHandlingProps {
	errorMessage: string | null;
	clearError: () => void;
}

interface IWithErrorHandlingOptions {
	isDev?: boolean;
}

// Generic type for props of the WrappedComponent
type PropsWithHoc<P> = P & IWithErrorHandlingProps;

const withErrorHandling = <P extends object>(
	WrappedComponent: React.ComponentType<PropsWithHoc<P>>,
	options: IWithErrorHandlingOptions = {}
): React.FC<P> => {
	const { isDev = false } = options;

	const WithErrorHandling: React.FC<P> = (props) => {
		const [ errorMessage, setErrorMessage ] = React.useState<string | null>(null);

		React.useEffect(() => {
			const errorHandler = (error: Error) => {
				if (isDev) {
					console.error('Error caught:', error);
				}
				setErrorMessage(error.message);
			};

			// Set up error handling using componentDidCatch equivalent
			const originalError = window.onerror;

			window.onerror = (message, source, lineno, colno, error) => {
				errorHandler(error || new Error(message as string));
				if (originalError) {
					originalError(message, source, lineno, colno, error);
				}
				return true;
			};

			// Cleanup
			return () => {
				window.onerror = originalError;
			};
		}, [ isDev ]);

		const dismissError = () => {
			setErrorMessage(null);
		};

		return (
			<Box>
				{errorMessage && (
					<ErrorMessage 
						message={errorMessage}
						onDismiss={dismissError}
					/>
				)}
				<WrappedComponent 
					{...props as P} 
					errorMessage={errorMessage}
					clearError={dismissError}
				/>
			</Box>
		);
	};

	return WithErrorHandling;
};

export default withErrorHandling;
