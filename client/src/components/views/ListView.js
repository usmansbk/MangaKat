import React from 'react';
import { Link } from 'react-router-dom';

export default class ListView extends React.Component {
	render() {
		const { mangas, search } = this.props;
		let mappedMangas = Object.values(mangas.byId).map((manga) => ({
			name: manga.name.trim(),
			mangaId: manga.mangaId}));
		if (search) {
			mappedMangas = mappedMangas.filter(manga => manga.name.toLowerCase().includes(search.toLowerCase()))
		}
		const cards = mappedMangas.slice(0, 50).map((manga, index) => {
			return (
				<Link key={index} to={manga.mangaId} className='collection-item'>
					{manga.name}
				</Link>
			)
		});
		return (
			<ul className='collection'>
				{cards}
			</ul>);
	}
}