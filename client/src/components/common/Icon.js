import React from 'react';

export default function Icon({name, position, className, ...rest}) {
	return (
		<i className={`${position} material-icons ${className}`} {...rest}>
			{name}
		</i>
	);
}