import React from 'react';
import { Link } from 'react-router-dom';
import NavControls from '../common/NavControls';
import JumpNav from '../common/JumpNav';

export default class PageView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageId: 1,
			chapterId: 1,
			mangaId: '',
			dataURLs: null,
			url: '/loading.gif',
		}
		this.style = {
			width: "inherit",
		};
		this.pages = [];
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onLoadImage = this.onLoadImage.bind(this);
	}

	onLoadImage(event) {
		document.scrollingElement.scrollTop = 0;
	}

	handleChange(event) {
		const {name, value} = event.target;
		let { history, saveSession } = this.props;
		const {mangaId, chapterId, pageId} = this.state;
		let url = history.location.pathname;
		if (name === 'chapterId') url = `/${mangaId}/${value}/1`;
		if (name === 'pageId') url = `/${mangaId}/${chapterId}/${value}`;
		history.push(url);
		saveSession(mangaId, chapterId, pageId);
	}

	handleClick(event) {
		const {name} = event.target;
		const key = event.key;
		if (this.pages.length === 0) {
			event.stopImmediatePropagation();
			return;
		} 
		if( !name && (key !== 'ArrowLeft') && (key !== 'ArrowRight')) return;

		const {mangaId, pageId, chapterId} = this.state;
		const { history, saveSession } = this.props;
		let nextPage = +pageId;
		let nextChapter = +chapterId;
		if (name === 'previous' || key === 'ArrowLeft') {
			nextPage -= 1;
		}
		if (name === 'next' || key === 'ArrowRight') {
			nextPage += 1;
		}
		if (nextPage < 1) {
			nextChapter -= 1;
			nextPage = 1;
		}
		if (nextPage >= this.pages.length) {
			nextChapter += 1;
			nextPage = 1;
		}
		if (nextChapter < 1) {
			nextChapter = 1;
			nextPage = 1;
		}
		if (nextChapter > this.numberOfChapters) {
			nextChapter = this.numberOfChapters;
			nextPage = +pageId;
		}
		const newUrl = `/${mangaId}/${nextChapter}/${nextPage}`;
		history.push(newUrl);
		saveSession(mangaId, chapterId, pageId);
	}


	parseUrl(url) {
		const urlRegex = /\/(\S+)\/(\d+)\/(\d+)/;
		const tokens = url.match(urlRegex);	
		return tokens;
	}

	loadPage(props) {
		const { history, chapters, setPage, loadManga, loadChapter, manga, saveSession, markAsRead, getSavedChapter} = props;
		const url = history.location.pathname;
		this.url = url;
		const tokens = this.parseUrl(url);
		const [, mangaId, chapterId, pageId ] = tokens;
		setPage(mangaId, chapterId);

		this.chapterUrl = `/${mangaId}/${chapterId}`;
		this.currentChapter = chapters[this.chapterUrl] || {};
		this.pages = this.currentChapter.pages || [];

		this.numberOfChapters = manga.chapters && (manga.chapters.length + 1);
		if (!manga.isUpdated) loadManga(mangaId);
		if (!this.currentChapter.isUpdated) loadChapter(this.chapterUrl);
		getSavedChapter(this.chapterUrl).then(dataURLs => this.setState({dataURLs, mangaId,chapterId, pageId}));
		markAsRead(mangaId, chapterId);
		saveSession(mangaId, chapterId, pageId);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleClick)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleClick);
	} 

	componentWillMount() {
		this.loadPage(this.props);
	}

	componentWillReceiveProps(nextProps) {
		const {history, chapters, manga, getImage } = nextProps;
		const newUrl = history.location.pathname;
		if (newUrl !== this.url) {
			this.loadPage(nextProps);
		}
		const tokens = this.parseUrl(newUrl);
		const [, mangaId, chapterId ] = tokens;
		this.chapterUrl = `/${mangaId}/${chapterId}`;
		this.currentChapter = chapters[this.chapterUrl] || {};
		this.pages = this.currentChapter.pages || [];
		this.numberOfChapters = manga.chapters && (manga.chapters.length + 1);
		const { pageId, dataURLs } =this.state;
		const page = this.pages[pageId-1];
		// eslint-disable-next-line
		let url = page && `https:\//corsserver.herokuapp.com/file?url=${page.url}`;
		if (dataURLs) {
			url = dataURLs[pageId-1]
			this.setState({url})
		} else {
			getImage(url).then(url => this.setState({url})).catch(() => this.setState({url: '/error.png'}));
		}

	}

	render() { 
		const {manga} = this.props;
		const { pageId, chapterId, mangaId } = this.state;
		const {name} = manga;
		const pages = this.pages;
		const mangaLink = `/${mangaId}`;
		const isDisabled = pages.length === 0
		return (
			<div className="col m12">
				<h5 className='truncate' title={name}>
				<Link to={mangaLink}>{name}</Link> - Chapter {chapterId}: {this.currentChapter.name} <span className='green-text'>Page {pageId}</span>
				</h5>
				<JumpNav
				page={pageId}
				chapter={chapterId}
				onChange={this.handleChange}
				pages={pages}
				chapters={manga.chapters} />
				<NavControls disabled={isDisabled} onClick={this.handleClick} />
				<img
				onLoad={this.onLoadImage}
				src={this.state.url}
				alt={pageId}
				style={this.style} />
				<NavControls disabled={isDisabled} onClick={this.handleClick} />
			</div>
		);
	}
}