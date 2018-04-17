import React from 'react';
import { Link } from 'react-router-dom';
import MangaCard from '../MangaCard';

export default class CardsView extends React.Component {
	constructor(props) {
		super(props);
		this.handleKey = this.handleKey.bind(this);
	}

	handleKey(event) {
		const { history } = this.props;
		if (event.key === 'Backspace') history.goBack();
	}

	componentWillMount() {
		const { clearNotification } = this.props;
		clearNotification();
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKey);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKey);
	}

	render() {
		const { mangas, favorites, getCover } = this.props;
		const cards =  favorites.sort().map((id, index) => {
			const manga = mangas.byId[id];
			return <Link key={index} to={manga.mangaId}>
				<MangaCard
				img={manga.cover}
				mangaTitle={manga.name}
				newChapters={manga.newChapters}
				getCover={getCover}
				/>
			</Link>
		});
		const ret = cards.length ? cards : <h1 className='center-align grey-text lighten-2'>No Favorited Manga</h1>
		return ret;
	}
}