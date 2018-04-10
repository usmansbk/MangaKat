import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../containers/Pagination';
import Icon from '../common/Icon';

export default class ListView extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		event.preventDefault();
		const { cancelSearch, history } = this.props;
		cancelSearch();
		history.goBack();
	}

	componentWillMount() {
		const { onEnter, isInvalidated } = this.props;
		onEnter(isInvalidated);
	}

	render() {
		const { mangas, search, fetchedItemsCount, itemsPerPage } = this.props;
		let mappedMangas = Object.values(mangas.byId).map((manga) => ({
			name: manga.name.trim(),
			mangaId: manga.mangaId
		}));
		if (search) {
			mappedMangas = mappedMangas.filter(manga => manga.name.toLowerCase().includes(search.toLowerCase()))
		}
		const cards = mappedMangas.sort((a, b) => a.name.localeCompare(b.name)).slice(fetchedItemsCount, fetchedItemsCount + itemsPerPage).map((manga, index) => {
			return (
				<Link key={index} to={manga.mangaId} className='collection-item'>
					{manga.name}
				</Link>
			)
		});
		return (
				<div className='row'>
				<div className='col s12 m6 offset-m3'>
				<ul className='collection with-header'>
					<li className='collection-header'>
						{
						 search ?
						 <h4>Searching for "{search}" <a title='Close' href="#close" onClick={this.onClick}><Icon name='close' position='right' /></a></h4>
						 :<h4>All Mangas</h4>
						}
					</li>
					{cards}
				</ul>
				{ !search && <Pagination /> }
				</div>
				</div>
		);
	}
}