import React from 'react';
import JumpNav from '../common/JumpNav';
import NavControls from '../common/NavControls';
import Preloader from '../common/Preloader';
import Icon from '../common/Icon';
import Button from '../common/Button';

export default class ChapterView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageId: 1,
			chapterId: 1,
			isLoading: false
		}
		this.onChange = this.onChange.bind(this);
		this.onLoad = this.onLoad.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		const { target } = event;
		const {name} = target;
		const { mangaId, chapterId, pageId } = this.state;
		const { history, chapter, loadChapter } = this.props;
		const { pages=[] } = chapter;
		let nextPage = +pageId;
		let nextChapter = +chapterId;

		if (name === 'next') {
			nextPage += 1;
		}
		if (name === 'previous') {
			nextPage -= 1;
		}
		if (nextPage < 1) {
			nextPage = 1;
			nextChapter -= 1;
			loadChapter(mangaId, nextChapter);
		}
		if (nextPage > pages.length) {
			nextPage = 1;
			nextChapter += 1;
			loadChapter(mangaId, nextChapter);
		}
		const url = `/${mangaId}/${nextChapter}/${nextPage}`;
		history.push(url);
		this.setState({
			pageId: nextPage,
			chapterId: nextChapter,
			isLoading: true
		});
	}

	onLoad() {
		document.scrollingElement.scrollTop = 0;
		this.setState({isLoading: false})
	}

	onChange(event) {
		const { target } = event;
		const { name, value } = target;
		const { history, loadChapter, saveSession } = this.props;
		const tokens = this.parseURL(history.location.pathname);
		const [, mangaId, chapterId] = tokens;
		if (name === 'chapterId') {
			const newURL = `/${mangaId}/${value}/1`;
			history.push(newURL);
			loadChapter(mangaId, value);
			saveSession(mangaId, value, 1)
		} else {
			const newURL = `/${mangaId}/${chapterId}/${value}`;
			saveSession(mangaId, chapterId, value);
			history.push(newURL);
		}
		this.setState({[name]: value, isLoading: true});
	}

	parseURL(url) {
		const urlRegex = /\/(\S+)\/(\d+)\/(\d+)/;
		return url.match(urlRegex);
	}

	componentDidMount() {
		const { history, loadManga, loadChapter, manga } = this.props;
		const { pathname } = history.location;
		const tokens = this.parseURL(pathname);
		const [, mangaId, chapterId, pageId] = tokens;
		this.setState({mangaId, pageId, chapterId});
		loadManga(manga, mangaId);
		loadChapter(mangaId, chapterId);
	}

	render() {
		const { chapters, chapter } = this.props;
		const { mangaId, pageId, chapterId, isLoading } = this.state;
		const { pages=[] } = chapter;
		let page = pages[pageId - 1] || {};
		const { url } = page;

		return (
			<div className='section'>
				<div>
					<Button href={`/${mangaId}`}><Icon name='arrow_back' /></Button>
					<JumpNav
						onChange={this.onChange}
						page={pageId}
						chapter={chapterId}
						chapters={chapters}
						pages={pages}
					/>
					<NavControls onClick={this.onClick} />
				</div>
				<div>
					{ isLoading && <Preloader className='red indeterminate' /> }
					<img
						onLoad={this.onLoad}
						width='100%'
						src={url}
						alt={url} />
				</div>
				<NavControls onClick={this.onClick} />
			</div>
		);
	}
}