import React from 'react';
import { Link } from 'react-router-dom';
import MangaCard from '../MangaCard';

export default class CardsView extends React.Component {
	componentWillMount() {
		const { clearNotification } = this.props;
		clearNotification();
	}
	render() {
		const { mangas, favorites } = this.props;
		const cards =  favorites.sort().map((id, index) => {
			const manga = mangas.byId[id];
			return <Link key={index} to={manga.mangaId}>
				<MangaCard
				img={manga.cover}
				mangaTitle={manga.name}
				newChapters={manga.newChapters}
				/>
			</Link>
		});
		const ret = cards.length ? cards : <h1 className='center-align grey-text lighten-2'>No Favorited Manga</h1>
		return ret;
	}
}