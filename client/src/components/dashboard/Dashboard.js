import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Preloader from '../common/Preloader';
import Alert from '../common/Alert';
import MangaView from '../views/MangaView';
import ListView from '../../containers/ListView';
import AboutView from '../views/AboutView';
import NoMatch from '../error/NoMatch';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetching: false,
			failed: false
		}
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		event.preventDefault();
		this.setState({
			failed: false
		})
	}

	componentWillReceiveProps(nextProps) {
		const { isFetching, failed } = nextProps;
		this.setState({
			isFetching,
			failed
		})
	}

	render() {
		const { isFetching, failed } = this.state
		return (
			<React.Fragment>
				<Nav/>
				<div className="container">
					<div className="row">
						{
							failed && <Alert onClick={this.onClick}><b>Network connection error</b>. Read downloaded manga.</Alert>
						}
						{
							isFetching && <Preloader className='indeterminate' />
						}
						<Switch>
						<Route exact path='/' component={ListView} />
						<Route exact path='/about' component={AboutView} />
						<Route path='/:mangaid' component={MangaView} />
						<Route component={NoMatch} />
						</Switch>
					</div>
				</div>
			</React.Fragment>
		);
	}
}