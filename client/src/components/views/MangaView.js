import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MangaContent from '../../containers/MangaContent';
import ImageView from '../../containers/ImageView';

export default function MangaView({match}) {
	return (
		<Switch>
		<Route
		exact
		path={match.url}
		component={MangaContent}/>

		<Route
		path={`${match.url}/:chapter`}
		component={ImageView}
		/>
		</Switch>
	);
}