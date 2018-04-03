import React from 'react';
import Button from './Button';

export default function NavControls(props) {
	return (
		<div>
			<Button icon="arrow_back" position="left" />
			<Button icon="arrow_forward" position="right" />
		</div>
	);
}