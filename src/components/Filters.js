import React from 'react';
import M from 'materialize-css';
import Button from './common/Button';
import Icon from './common/Icon';
import Genres from '../containers/Genres';

export default class Filters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			values: 'all',
			sort: true,
			genres: false,
		}
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		const { onClick, resetFilters } = this.props;
		const { name } = event.target;
		let { sort, genres } = this.state;
		let value;
		if (name === 'sort')
			value = !sort;
		if (name === 'genres') {
			value = !genres;
			resetFilters();
		}
		this.setState({[name]: value});
		if (name ==='sort')
			onClick(event);
	}

	componentWillMount() {
		M.Collapsible.init(document.querySelector('.collapsible'));
	}

	render() {
		const style = {
			marginLeft: '5px',
			marginRight: '5px',
			marginTop: '5px'
		}
		return (
			<React.Fragment>
				<div>
					<Button style={style} className={!this.state.sort && 'btn-flat'} title="Sort alphabetically" name='sort' onClick={this.onClick}>Alphabetical<Icon position='right' name='sort_by_alpha' /></Button>
					<Button style={style} title='Filter genres' name='genres' onClick={this.onClick}>Genres<Icon position='right' name='filter_list' /></Button>
				</div>
				{ this.state.genres && <Genres /> }
			</React.Fragment>
		);
	}
}