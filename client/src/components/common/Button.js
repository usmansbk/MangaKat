import React from 'react';

export default function Button(props) {
	const {children, ...rest} = props;
	const style = {
		marginLeft: "2px",
		marginRight: "2px"
	}
	return (
			<a className="waves-effect waves-light btn" style={style} {...rest} >
			{children}
			</a>
	);
}