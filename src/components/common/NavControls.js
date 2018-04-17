import React from 'react';
import Button from './Button';

export default function NavControls(props) {
	const style = {
		marginBottom: "5px"
	};

	const { onClick, disabled } = props

	return (
		<div className="right" style={style}>
			<Button className={disabled?"disabled":''} name='previous' onClick={onClick} >Previous</Button>
			<Button className={disabled?"disabled":''} name='next' onClick={onClick} >Next</Button>
		</div>
	);
}