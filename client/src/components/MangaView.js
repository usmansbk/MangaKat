import React from 'react';
import { Route } from 'react-router-dom';
import MangaInfoCard from './MangaInfoCard';
import ChapterList from './ChapterList';
import ImageView from './ImageView';

export default function MangaView({match}) {
	return (
		<React.Fragment>
			<Route
			exact
			path={match.url}
			component={MangaInfoCard}/>

			<Route
			exact
			path={match.url}
			component={ChapterList} />

			<Route
			path={`${match.url}/:chapter/:page`}
			component={ImageView}
			/>
		</React.Fragment>
	);
}