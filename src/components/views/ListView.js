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

	handleKey(event) {
		const {key, target} = event;
		let {search} = this.state;
		if (key !== 'Enter' && target.name !== 'search') {
			search += key;
			this.handleSearch(search);
		}
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
		let { mangas, search, fetchedItemsCount, itemsPerPage } = this.props;
		let mappedMangas = Object.values(mangas.byId).map((manga) => ({
			name: manga.name.trim(),
			mangaId: manga.mangaId
		}));
		if (search) {
			mappedMangas = mappedMangas.filter(manga => manga.name.toLowerCase().includes(search.toLowerCase()));
		}
		const cards = mappedMangas.sort((a, b) => a.name.localeCompare(b.name)).slice(fetchedItemsCount, fetchedItemsCount + itemsPerPage).map((manga, index) => {
			return (
				<Link key={index} to={manga.mangaId} className='collection-item'>
					{manga.name}
				</Link>
			)
		});
		return (
			<div className='col s12 l6 offset-l3' onKeyPress={this.handleKey}>
				{ search && <Filters /> }
				<ul className='collection with-header'>
					<li className='collection-header'>
						{
						 search ?
						 <h4>Searching for "{search}" <a title='Close' href="#close" onClick={this.onClick}><Icon name='close' position='right' /></a></h4>
						 :<h4>Manga List</h4>
						}
					</li>
					{cards}
				</ul>
				<Pagination />
			</div>
		);
	}
}