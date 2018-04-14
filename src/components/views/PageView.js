import React from 'react';
import { Link } from 'react-router-dom';
import NavControls from '../common/NavControls';
import JumpNav from '../common/JumpNav';
import Preloader from '../common/Preloader';

export default class PageView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageId: 1,
			chapterId: 1,
			mangaId: ''
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
		this.setState({isLoadingImage: false});
	}

	handleChange(event) {
		const {name, value} = event.target;
		let { history } = this.props;
		const {mangaId, chapterId} = this.state;
		let url = history.location.pathname;
		if (name === 'chapterId') url = `/${mangaId}/${value}/1`;
		if (name === 'pageId') url = `/${mangaId}/${chapterId}/${value}`;
		history.push(url);
	}

	handleClick(event) {
		const {name} = event.target;
		const key = event.key;
		if (!name && key !== 'ArrowLeft' && key !== 'ArrowRight') return;

		const {mangaId, pageId, chapterId} = this.state;
		const { history, saveSession } = this.props;
		let nextPage = +pageId;
		let nextChapter = +chapterId;
		let isLoadingImage = true;
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
			isLoadingImage = false;
		}
		if (nextChapter > this.numberOfChapters) {
			nextChapter = this.numberOfChapters;
			nextPage = this.pages.length;
			isLoadingImage = false;
		}
		this.setState({isLoadingImage})
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
		const { history, chapters, setPage, loadManga, loadChapter, manga, saveSession} = props;
		const url = history.location.pathname;
		this.url = url;
		const tokens = this.parseUrl(url);
		const [, mangaId, chapterId, pageId ] = tokens;
		setPage(mangaId, chapterId);
		this.chapterUrl = `/${mangaId}/${chapterId}`;
		this.currentChapter = chapters[this.chapterUrl] || {};
		this.pages = this.currentChapter.pages || [];
		this.numberOfChapters = manga.chapters && manga.chapters.length;
		this.setState({mangaId, chapterId, pageId});
		if (!manga.isUpdated) loadManga(mangaId);
		if (!this.currentChapter.isUpdated) loadChapter(this.chapterUrl);
		saveSession(mangaId, chapterId, pageId, manga);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleClick)
	}

	componentWillMount() {
		this.loadPage(this.props);
	}

	componentWillReceiveProps(nextProps) {
		const { history, chapters, manga} = nextProps;
		const newUrl = history.location.pathname;
		if (newUrl !== this.url) {
			this.loadPage(nextProps);
		}
		const tokens = this.parseUrl(newUrl);
		const [, mangaId, chapterId] = tokens;
		this.chapterUrl = `/${mangaId}/${chapterId}`;
		this.currentChapter = chapters[this.chapterUrl] || {};
		this.pages = this.currentChapter.pages || [];
		this.numberOfChapters = manga.chapters && manga.chapters.length;
	}

	render() { 
		const {manga} = this.props;
		const { pageId, chapterId, mangaId } = this.state;
		const {name} = manga;
		const pages = this.pages;
		const mangaLink = `/${mangaId}`;

		const page = pages[pageId-1];
		const url = page && page.url;
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
				<NavControls onClick={this.handleClick} />
				{ this.state.isLoadingImage && <Preloader className='indeterminate'/> }
				<img
				onLoad={this.onLoadImage}
				src={url}
				alt={pageId}
				style={this.style} />
				<NavControls onClick={this.handleClick} />
			</div>
		);
	}
}