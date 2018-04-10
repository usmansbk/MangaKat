import React from 'react';
import MangaInfoCard from './MangaInfoCard';
import ChapterList from './ChapterList';

export default class MangaContent extends React.Component {
	componentWillMount() {
		const { history, onEnter, mangas } = this.props;
		const mangaUrl = history.location.pathname;
		this.id = mangaUrl.substring(1);
		onEnter(this.id, mangas);
	}

	render() {
		const { manga, match} = this.props;
		const chapters = manga && manga.chapters
		return	(
			<React.Fragment>
				<MangaInfoCard
				 mangaId={this.id}
				 handleFavorite={this.props.handleFavorite}
				 handleResume={this.props.handleResume}
				 favorites={this.props.favorites}
				 lastRead={this.props.lastRead}
				 {...manga }/>
				<ChapterList chapters={chapters || []} match={match} />
			</React.Fragment>
		)
	}
}