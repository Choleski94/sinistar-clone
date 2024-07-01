import React from 'react';

import Header from './Header';

interface ILayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => (
	<>
		<Header />
		{children}
	</>
);

export default Layout;
