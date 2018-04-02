import React from 'react';
import Icon from './Icon';

export default function Menu(props) {
	return (
		<a
		href="#!"
		data-target="mobile"
		className="sidenav-trigger"
		>
			<Icon name="menu"/>
		</a>
	);
}