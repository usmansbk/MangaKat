import React from 'react';

export default function Maintanance(props) {
	const { history } = props;
	return (
		<div>
			<h1 className="center-align">Page Under Maintanance</h1>
			<a href='/' onClick={(e) => {
				e.preventDefault();
				history.replace('/');
			}}>
			<h4 className="center-align">Home</h4>
			</a>
		</div>
	);
}