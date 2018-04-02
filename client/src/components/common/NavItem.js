import React from 'react';
import Icon from './Icon';

export default function NavItem({icon, link, children, ...rest}) {
	return (
		<li>
			<a href={link} {...rest}>
				<Icon position="left" name={icon}  />
				{children}
			</a>
		</li>
	);
}