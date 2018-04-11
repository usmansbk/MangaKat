import React from 'react';
import Icon from './Icon';

export default class Fab extends React.Component {
	render() {
		const { name, href, onClick} = this.props;
		return (
			<div className="fixed-action-btn">
				<a href={href} className="btn-floating btn-large red" onClick={onClick}>
					<Icon name={name} />
				</a>
			</div>
		)
	}
}