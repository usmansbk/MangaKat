import React from 'react';
import M from 'materialize-css';

export default class Select extends React.Component {
	componentDidMount() {
		M.FormSelect.init(document.querySelectorAll('select'));
	}
	render() {
		const {className, multiple, options, ...rest} = this.props;
		return (
			<select multiple={multiple} onChange={this.props.onChange} value={this.props.value} className={'browser-default' + (className?className:'')} {...rest}>
				{options}
			</select>
		)
	}
}