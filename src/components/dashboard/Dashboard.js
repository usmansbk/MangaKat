import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Preloader from '../common/Preloader';
import Alert from '../common/Alert';
import MangaView from '../../containers/MangaView';
import ListView from '../../containers/ListView';
import CardsView from '../../containers/CardsView';
import DownloadView from '../../containers/DownloadView';
import PageView from '../../containers/PageView';
import AboutView from '../views/AboutView';
import NoMatch from '../error/NoMatch';
import Error from '../error/Error';

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
		const {clearError} = this.props;
		this.setState({
			failed: false
		});
		clearError();
	}

	componentWillReceiveProps(nextProps) {
		const { isFetching, failed } = nextProps;
		this.setState({
			isFetching,
			failed
		})
	}

	componentWillMount() {
		const { fetchUpdates, favorites } = this.props;
		const update = () => fetchUpdates(favorites);
		const MINUTES = 8;
		const time = 1000 * 60 * MINUTES;
		setInterval(update, time);
	}

	render() {
		const { isFetching, failed } = this.state
		const { hasUnread } = this.props;
		return (
			<Error>
				<Nav hasUnread={hasUnread} />
				<div className="container">
					<div className="row">
						{
							failed && <Alert onClick={this.onClick}><b>No internet connection, try again.</b></Alert>
						}
						{
							isFetching && <Preloader className='indeterminate' />
						}
						<Switch>
						<Route exact path='/' component={ListView} />
						<Route exact path='/favorites' component={CardsView} />
						<Route exact path='/download/:mangaid' component={DownloadView} />
						<Route exact path='/about' component={AboutView} />
						<Route exact path='/:mangaid' component={MangaView} />
						<Route exact path='/:mangaid/:chapterId/:pageid' component={PageView} />
						<Route component={NoMatch} />
						</Switch>
					</div>
				</div>
			</Error>
		);
	}
}