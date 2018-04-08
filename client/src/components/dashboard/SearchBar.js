import React from 'react';
import Icon from '../common/Icon';

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {search: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(event) {
		const { find } = this.props;
		const { value } = event.target
		this.setState({search: value});
		find(value);
	}

	handleClick(event) {
		const { find } = this.props;
		this.setState({search: ''});
		find('');
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	render() {
		const style = {
			margin: "0px",
			display: "inlineBlock"
		};

		return (
			<form className="right" style={style} onSubmit={this.handleSubmit}>
				<div className="input-field">
					<input onChange={this.handleChange} value={this.state.search} type="search" name="search" placeholder="Find Manga" required />
					<label className="label-icon" htmlFor="search"><Icon name="search" /></label>
					<Icon onClick={this.handleClick} name="close"/>
				</div>
			</form>
		);
	}
}