import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

export default function App(props) {
	return (
		<BrowserRouter>
			<Dashboard />
		</BrowserRouter>
	);
}