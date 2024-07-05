import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
	// Load app-level environment variables to node-level environment variables.
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		plugins: [react()],
		resolve: {
			alias: {
				// Add support for Material-UI with styled-components.
				'@mui/styled-engine': '@mui/styled-engine-sc',
				// Custom path aliases for various directories
				'@src': path.resolve(__dirname, 'src'),
				'@app': path.resolve(__dirname, 'src/App'),
				'@api': path.resolve(__dirname, 'src/api'),
				'@store': path.resolve(__dirname, 'src/store'),
				'@utils': path.resolve(__dirname, 'src/utils'),
				'@mocks': path.resolve(__dirname, 'src/mocks'),
				'@mocks/*': path.resolve(__dirname, 'src/mocks'),
				'@utils/*': path.resolve(__dirname, 'src/utils'),
				'@config': path.resolve(__dirname, 'src/config'),
				'@styles': path.resolve(__dirname, 'src/styles'),
				'@locales': path.resolve(__dirname, 'src/locales'),
				'@screens': path.resolve(__dirname, 'src/screens'),
				'@components': path.resolve(__dirname, 'src/components'),
			},
		},
		server: {
			// Specify the port for the development server.
			port: 3000,
		},
	});
}

