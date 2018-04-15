import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../containers/Pagination';
import Filters from '../Filters';
import Icon from '../common/Icon';

export default class ListView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		}
		this.onClick = this.onClick.bind(this);
		this.handleKey = this.handleKey.bind(this);
		this.backspace = this.backspace.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
	}

	componentDidMount() {
		document.addEventListener('keypress', this.handleKey);
		document.addEventListener('keydown', this.backspace);
	}

	componentWillUnmount() {
		document.removeEventListener('keypress', this.handleKey);
		document.removeEventListener('keydown', this.backspace);
	}

	componentWillReceiveProps(nextProps) {
		const {search} = nextProps;
		this.setState({search});
	}

	backspace(event) {
		const {key} = event;
		let {search} = this.state;
		if (key === 'Backspace') {
			search = search.slice(0, search.length-1);
			this.handleSearch(search);
		}
	}
 
	handleSearch(search) {
		const {listSearch} = this.props;
		listSearch(search);
	}

	// Firefox compatibility
	testKey(key) {
		return (key.length === 1)
	}

	handleKey(event) {
		const {key, target} = event;
		let {search} = this.state;
		if (key !== 'Enter' && target.name !== 'search' && this.testKey(key)) {
			search += key;
			this.handleSearch(search);
		}
	}

	handleFilter(event) {
		const { target } = event;
		const sort = target.name;
		const { sortBy } = this.props;
		sortBy(sort);
	}

	onClick(event) {
		event.preventDefault();
		const { cancelSearch } = this.props;
		cancelSearch();
		this.setState({search: ''});
	}


	componentWillMount() {
		const { onEnter, isInvalidated } = this.props;
		onEnter(isInvalidated);
	}

	render() {
		let {
			mangas,
			search,
			fetchedItemsCount,
			itemsPerPage,
			sort,
			favorites,
			filters
		} = this.props;
		let mappedMangas = Object.values(mangas.byId).map((manga) => manga);
		if (filters.length) {
			mappedMangas = mappedMangas.filter(manga => filters.every(genre => manga.genres && manga.genres.includes(genre)));
		}
		if (search) {
			mappedMangas = mappedMangas.filter(manga => manga.name.trim().toLowerCase().includes(search.toLowerCase()));
		}
		if (sort) {
			mappedMangas = mappedMangas.filter(manga => manga.name.trim().toLowerCase().startsWith(search.toLowerCase()));
		}
		const cards = mappedMangas
			.sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
			.slice(fetchedItemsCount, fetchedItemsCount + itemsPerPage)
			.map((manga, index) => {
				const isFavorite = favorites.indexOf(manga.mangaId) >= 0;
				return (
					<Link key={index} to={manga.mangaId} className='collection-item'>
						{manga.name}
						{ isFavorite && <Icon name='favorite_border' position='right' />}
					</Link>
				)
			});
		return (
			<div className='col s12 l6 offset-l3'>
				<Filters onClick={this.handleFilter} resetFilters={this.props.resetFilters} />
				<ul className='collection with-header'>
					<li className='collection-header'>
						{
						 search ?
						 <h4>Searching for "{search}" <a title='Close' href="#close" onClick={this.onClick}><Icon name='close' position='right' /></a></h4>
						 :<h4>Manga List</h4>
						}
					</li>
					{cards}
					{ (search && cards.length === 0) && <h3 className='center-align blue-text'>Not found</h3>}
				</ul>
				<Pagination mangaCount={mappedMangas.length} />
			</div>
		);
	}
}