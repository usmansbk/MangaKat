import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav';
import MangaView from './MangaView';
import CardsView from './CardsView';

export default function Dashboard(props) {
	return (
		<React.Fragment>
			<Nav/>
			<div className="container">
				<div className="row">
					<Route exact path='/' component={CardsView} />
					<Route exact path='/favorites' component={CardsView} />
					<Route exact path='/downloads' component={CardsView} />
					<Route exact path='/manga' component={MangaView} />
				</div>
			</div>
		</React.Fragment>
	);
}