import React from 'react';
import M from 'materialize-css';
import Button from './common/Button';
import Icon from './common/Icon';

export default class Filters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			values: 'all'
		}
	}

	componentWillMount() {
		M.Collapsible.init(document.querySelector('.collapsible'));
	}

	render() {
		return (
			<div className="section">
				<Button disabled={true} title="Genres">Genres<Icon position='right' name='group_work' /></Button>
				<span className="blue-text">Requires internet connection</span>
			</div>
		);
	}
}