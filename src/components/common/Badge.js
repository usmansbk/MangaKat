import React from 'react';

export default function Badge(props) {
	const { children } = props;
	return (
		<span className='new badge blue darken-3'>{children}</span>
	);
}