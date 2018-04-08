import React from 'react';

export default function Icon({name, position, ...rest}) {
	return (
		<i className={`material-icons ${position}`} {...rest}>
			{name}
		</i>
	);
}