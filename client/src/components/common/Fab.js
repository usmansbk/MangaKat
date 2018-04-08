import React from 'react';
import Icon from './Icon';

export default function Fab(props) {
	const {title, location} = props;
	let icon;
	switch(location) {
		case '/favorites': icon = 'favorite'; break;
		case '/downloads': icon = 'delete'; break;
		default: icon = 'favorite'; break;
	}
	return (
		<span title={title} className="btn-floating halfway-fab red">
			<Icon name={icon}/>
		</span>
	);
}