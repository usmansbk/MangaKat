import React from 'react';

export default function NavList({className, children, ...rest}) {
	return (
		<ul
		className={className}
		{...rest}
		>
		{children}
		</ul>
	);
}