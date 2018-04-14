import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';

export default function NavItem({className, icon, link, children, ...rest}) {
	return (
		<li>
			<NavLink 
			exact
			to={link}
			activeClassName="teal darken-1"
			className={className}
			{...rest}>
				<Icon position="left" name={icon}  />
				{children}
			</NavLink>
		</li>
	);
}