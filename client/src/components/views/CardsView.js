import React from 'react';
import { Link } from 'react-router-dom';
import MangaCard from '../MangaCard';

export default function CardsView(props) {
	const { mangas } = props;
	const cards =  mangas.ids.map((id, index) => {
		const manga = mangas.byId[id];
		return <Link key={index} to={manga.mangaId}>
			<MangaCard
			img={manga.cover}
			mangaTitle={manga.name}
			/>
		</Link>
	});
	return cards;
}