import React from 'react';
import MangaInfoCard from '../MangaInfoCard';
import ChapterList from '../../containers/ChapterList';

export default class MangaView extends React.Component {
	componentWillMount() {
		const { history, refresh, mangas } = this.props;
		const mangaUrl = history.location.pathname;
		this.id = mangaUrl.substring(1);
		refresh(this.id, mangas);
	}

	render() {
		const {manga} = this.props;
		return	(
			<React.Fragment>
				<MangaInfoCard
				 mangaId={this.id}
				 handleFavorite={this.props.handleFavorite}
				 handleResume={this.props.handleResume}
				 favorites={this.props.favorites}
				 lastRead={this.props.lastRead}
				 {...manga }/>
				<ChapterList />
			</React.Fragment>
		)
	}
}