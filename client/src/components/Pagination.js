import React from 'react';
import Icon from './common/Icon';
import PageItem from './common/PageItem';

export default class Pagination extends React.Component {
	constructor(props) {
		super(props);
		const { fetchedItemsCount, itemsPerPage } = this.props;
		const page = (Math.round(fetchedItemsCount / itemsPerPage) + this.OFFSET) || 1;
		this.state = {
			page
		};
		this.onClick = this.onClick.bind(this);
		this.total = 0;
		this.OFFSET = 1;
	}

	refresh(props) {
		const { fetchedItemsCount, itemsPerPage } = props;
		const page = (Math.round(fetchedItemsCount / itemsPerPage) + this.OFFSET) || 1;
		this.setState({ page });	
	}

	componentWillReceiveProps(nextProps) {
		this.refresh(nextProps);
	}

	componentWillMount() {
		this.refresh(this.props);
	}

	onClick(event) {
		event.preventDefault();
		const {name} = event.currentTarget;
		let { page } = this.state;
		const { updateFetchedItemsCount, itemsPerPage } = this.props;
		if (name === 'previous' && page > 1) page -= 1;
		else if (name === 'next' && page < this.total) page += 1;
		else if (name === 'last_page' && page < this.total) page = this.total;
		else if (name === 'first_page' && page > 1) page = 1;

		this.setState({ page })
		updateFetchedItemsCount(page - this.OFFSET, itemsPerPage);
	}

	render() {
		let { mangaCount, itemsPerPage, searchFound } = this.props;
		if (searchFound) mangaCount = searchFound.length;
		this.total = Math.ceil(mangaCount / itemsPerPage);
		const { page } = this.state;
		const disablePrevious = page <= 1;
		const disableNext = page >= this.total;
		const pStyle = {
			display: 'inline-block',
			lineHeight: '0',
		}
		if (!mangaCount) return null;
		return (
			<ul className="pagination center-align">
				<PageItem title='First page' onClick={this.onClick} className={disablePrevious && 'disabled'} name="first_page"><Icon name='first_page' /></PageItem>
				<PageItem title='Previous page' onClick={this.onClick} className={disablePrevious && 'disabled'} name="previous"><Icon name='chevron_left' /></PageItem>
				<p style={pStyle}>{`${page}/${this.total}`}</p>
				<PageItem title='Next page' onClick={this.onClick} className={disableNext && 'disabled'} name="next"><Icon name='chevron_right' /></PageItem>
				<PageItem title='Last page' onClick={this.onClick} className={disableNext && 'disabled'} name="last_page"><Icon name='last_page' /></PageItem>
			</ul>
		);
	}
}