import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';

import { StoreProvider } from './store';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
	<React.StrictMode>
		<StoreProvider>
			<App />
		</StoreProvider>
	</React.StrictMode>,
)
