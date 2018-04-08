import React from 'react';
import M from 'materialize-css';

export default class Select extends React.Component {
	componentDidMount() {
		M.FormSelect.init(document.querySelectorAll('select'));
	}
	render() {
		const {options, ...rest} = this.props;
		return (
			<select onChange={this.props.onChange} value={this.props.value} className='browser-default' {...rest}>
				{options}
			</select>
		)
	}
}