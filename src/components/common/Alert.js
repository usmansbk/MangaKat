import React from 'react';
import Icon from './Icon';

export default function Alert(props) {
	const {children, onClick} = props;
	const style = {
		height: 'auto',
		lineHeight: '0'
	}
	return (
		<div className="card-panel red lighten-4" style={style}>
			<span className="red-text text-darken-4">
				{children}
			</span>
			<a
			className="red-text"
			href="/dismiss"
			title="Dismiss"
			onClick={onClick}>
			<Icon
			position='right'
			name='close'
			style={style}
			/>
			</a>
		</div>
	);
}