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
			mangaId: ''
		}
		this.style = {
			width: "inherit",
		};
		this.pages = [];
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
		const {mangaId, pageId, chapterId} = this.state;
		const { history, saveSession } = this.props;
		let nextPage = +pageId;
		let nextChapter = +chapterId;
		if (name === 'previous') {
			nextPage -= 1;
		}
		if (name === 'next') {
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
			nextPage = this.pages.length;
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
				<img
				src={url}
				alt={pageId}
				style={this.style} />
				<NavControls onClick={this.handleClick} />
			</div>
		);
	}
}