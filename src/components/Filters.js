import React from 'react';
import M from 'materialize-css';
import Button from './common/Button';
import Icon from './common/Icon';

export default class Filters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			values: 'all',
			toggle: true
		}
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		const { onClick } = this.props;
		this.setState({
			toggle: !this.state.toggle
		});
		onClick(event);
	}

	componentWillMount() {
		M.Collapsible.init(document.querySelector('.collapsible'));
	}

	render() {
		return (
			<div className="section">
				<Button className={!this.state.toggle && 'btn-flat'} title="Alphabetically" name='alpha' onClick={this.onClick}>Sort<Icon position='right' name='sort_by_alpha' /></Button>
			</div>
		);
	}
}