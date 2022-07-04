/** @format */

import Head from 'next/head';
import Header from './Header';

const Layout = ({ children, headTitle, headDesc }) => {
	return (
		<div>
			<Head>
				<title>{headTitle}</title>
				<meta name='description' content={headDesc} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='w-full h-screen overflow-auto flex flex-col'>
				<Header />
				<div className='p-8'>{children}</div>
			</div>
		</div>
	);
};

export default Layout;
