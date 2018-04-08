import React from 'react';
import Maintanance from '../error/Maintanance';

export default class AboutView extends React.Component {
	render() {
		const { history } = this.props;
		return (
			<Maintanance history={history} />
		);
	}
}