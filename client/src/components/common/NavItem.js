import React from 'react';
import Icon from './Icon';

export default function NavItem({icon, link, children}) {
	return (
		<li>
			<a href={link}>
				<Icon position="left" name={icon} />
				{children}
			</a>
		</li>
	);
}