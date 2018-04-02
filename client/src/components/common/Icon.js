import React from 'react';

export default function Icon({name, position}) {
	return (
		<i className={`material-icons ${position}`}>
			{name}
		</i>
	);
}