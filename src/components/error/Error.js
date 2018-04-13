import React from 'react';
import { withRouter } from 'react-router-dom';

class Error extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		event.preventDefault();
		const {history} = this.props;
		history.push('/');
		this.setState({hasError: false});
	}

	componentDidCatch(error, info) {
		this.setState({ hasError: true});
		// console.log(error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h1 className='red-text center-align'>Something went wrong.</h1>
					<a href='#!' className='center-align' onClick={this.onClick}><h3>Go back home</h3></a>
				</div>
			)
		}
		return this.props.children;
	}
}

export default withRouter(Error);