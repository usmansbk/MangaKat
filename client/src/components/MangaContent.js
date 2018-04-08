import React from 'react';
import MangaInfoCard from './MangaInfoCard';
import ChapterList from './ChapterList';
import NoMatch from './error/NoMatch';

export default class MangaContent extends React.Component {
	componentWillMount() {
		const { history, onEnter } = this.props;
		const mangaUrl = history.location.pathname;
		const id = mangaUrl.substring(1);
		onEnter(id);
	}

	render() {
		const { manga, history, match} = this.props;
		const view = manga ?
			<React.Fragment>
				<MangaInfoCard {...manga }/>
				<ChapterList chapters={manga.chapters} match={match} />
			</React.Fragment>
			: <NoMatch history={history}/>
		return view;
	}
}