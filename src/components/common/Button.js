import React from 'react';

export default function Button(props) {
	const {children, className, href, ...rest} = props;
	const style = {
		marginLeft: "2px",
		marginRight: "2px"
	}
	return (
			<a className={`waves-effect waves-light btn ${className}`} style={style} href={href} {...rest} >
			{children}
			</a>
	);
}