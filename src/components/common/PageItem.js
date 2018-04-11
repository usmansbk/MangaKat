import React from 'react';

export default function PageItem(props) {
	const {className, children, ...rest} = props;
	return (
		<li className={"waves-effect " + className}><a {...rest}  href='#!'>{children}</a></li>
	);
}