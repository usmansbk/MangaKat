import React from 'react';

export default function NoMatch(props) {
	const { history } = props;
	return (
		<div>
			<h1 className="center-align">404</h1>
			<h2 className='center-align'>Page Not Found</h2>
			<h2 className="center-align">The link you followed may be broken</h2>
			<a href='/' onClick={(e) => {
				e.preventDefault();
				history.replace('/')
			}}><h4 className="center-align">Go back home</h4></a>
		</div>
	);
}