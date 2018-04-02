import React from 'react';
import Nav from './Nav';
import Content from './Content';

export default function Dashboard(props) {
	return (
		<React.Fragment>
			<Nav/>
			<Content/>
		</React.Fragment>
	)
}