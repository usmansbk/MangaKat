import React from 'react';
import { Link } from 'react-router-dom';
import NavControls from '../common/NavControls';
import JumpNav from '../common/JumpNav';

export default class ImageView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageId: 1,
			pages: [],
			name: null
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.chapterId = value;
		const { onEnter, history, isUpdated, chapters, match, saveSession } = this.props;
		const {url} = match;
		const mangaId = url.substring(1, url.lastIndexOf('/'));
		if (name === 'chapterId') {
			const newUrl = `/${mangaId}/${value}`;
			history.push(newUrl)
			const chapter = chapters[newUrl];
			const isChapterUpdated = chapter && chapter.isUpdated;
			onEnter(newUrl, mangaId, isUpdated, isChapterUpdated)
			this.setState({pageId: 1});
		}
		this.setState({
			[name]: value
		});
		saveSession(mangaId, value, this.state.pageId);
	}

	handleClick(event) {
		let { name } = event.target;
		let { pageId } = this.state;
		const { mangaId, chapterId } = this.props;
		const { saveSession } = this.props;
		name = name.toLowerCase();
		if (name === 'previous') pageId = --pageId 
		else pageId = ++pageId;
		this.setState({
			pageId
		});
		saveSession(mangaId, chapterId, pageId);
	}

	componentWillMount() {
		const { 
			onEnter,
			match,
			isUpdated,
			chapters,
			lastPage,
			saveSession,
		} = this.props;
		const {url} = match;
		const mangaId = url.substring(1, url.lastIndexOf('/'));
		const currentChapter = url.substring(url.lastIndexOf('/')+1);
		const chapter = chapters[url];
		const pages = chapter && chapter.pages;
		if (pages) {
			this.setState({
				pages,
				pageId: lastPage
			})
		}
		const isChapterUpdated = chapter && chapter.isUpdated;
		onEnter(match.url, mangaId, isUpdated, isChapterUpdated);
		saveSession(mangaId, currentChapter, this.state.pageId);
	}

	componentWillReceiveProps(nextProps) {
		const { chapters, match } = nextProps;
		const chapterKey = match.url;
		const chapter = chapters[chapterKey];
		const pages = chapter && chapter.pages;
		const name = chapter && chapter.name;
		if (pages) {
			this.setState({
				pages,
				name
			})
		}
	}

	render() {
		const {mangaName, chapterId, mangaId} = this.props;
		const mangaLink = `/${mangaId}`;
		const style = {
			width: "inherit",
		};
		const { pageId, pages, name} = this.state;
		const page = pages[pageId-1];
		const url = page && page.url;
		return (
			<div className="col m12">
				<h5 className='truncate' title={name}>
				<Link to={mangaLink}>{mangaName}</Link> - Chapter {chapterId}: {name} Page {pageId}
				</h5>
				<JumpNav
				page={pageId}
				chapter={chapterId}
				onChange={this.handleChange}
				pages={pages}
				chapters={this.props.chaptersList} />
				<NavControls onClick={this.handleClick} />
				<img
				onError={() => console.log('Error')}
				src={url}
				alt={pageId}
				style={style} />
				<NavControls onClick={this.handleClick} />
			</div>
		);
	}
}