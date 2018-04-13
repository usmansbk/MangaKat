import React from 'react';
import { Link } from 'react-router-dom';
import MangaCard from '../MangaCard';

export default function CardsView(props) {
	const { mangas, favorites } = props;
	const cards =  favorites.sort().map((id, index) => {
		const manga = mangas.byId[id];
		return <Link key={index} to={manga.mangaId}>
			<MangaCard
			img={manga.cover}
			mangaTitle={manga.name}
			/>
		</Link>
	});
	const ret = cards.length ? cards : <h1 className='center-align grey-text lighten-2'>No Favorited Manga</h1>
	return ret;
}