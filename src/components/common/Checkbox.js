import React from 'react';

export default function Checkbox(props) {
	const { children, ...rest } = props;
	return (
			<div className='col s6 l4'>
			<label>
				<input type='checkbox' {...rest} />
				<span>{children}</span>
			</label>
			</div>
	);
}