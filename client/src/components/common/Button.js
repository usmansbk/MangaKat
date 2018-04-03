import React from 'react';
import Icon from './Icon';

export default function Button({icon, position}) {
	return (
			<a 
			className={`waves-effect waves-light btn-small ${position}`}>
			<Icon name={icon} />
			</a>
	);
}