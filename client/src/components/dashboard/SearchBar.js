import React from 'react';
import Icon from '../common/Icon';

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {search: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}
	
	componentWillReceiveProps(nextProps) {
		const {search} = nextProps;
		this.setState({
			search,
		})
	}

	handleFocus(event) {
		const { history } = this.props;
		this.url = history.location.pathname;
		history.push('/');
	}

	handleBlur(event) {
		const { history} = this.props;
		const { search } = this.state;
		if (!search) history.goBack();;
	}

	handleChange(event) {
		const { find } = this.props;
		const { value } = event.target;
		find(value);
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
					<input autoComplete='off' onBlur={this.handleBlur} onChange={this.handleChange} onFocus={this.handleFocus} value={this.state.search} type="search" name="search" placeholder="Find Manga" required />
					<label className="label-icon" htmlFor="search"><Icon name="search" /></label>
				</div>
			</form>
		);
	}
}