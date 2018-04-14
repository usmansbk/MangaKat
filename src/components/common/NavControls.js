import React from 'react';
import Button from './Button';

export default function NavControls(props) {
	const style = {
		marginBottom: "5px"
	};

	const { onClick } = props

	return (
		<div className="right" style={style}>
			<Button href='#up' name='previous' onClick={onClick} >Previous</Button>
			<Button href='#up' name='next' onClick={onClick} >Next</Button>
		</div>
	);
}