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
		const {name} = event.target;
		const { onEnter, history, mangaId } = this.props;
		if (name === 'chapterId') {
			const { value } = event.target;
			const newUrl = `/${mangaId}/${value}`;
			history.push(newUrl)
			onEnter(newUrl)
			this.setState({pageId: 1});
		}
		this.setState({
			[name]: event.target.value
		});
	}

	handleClick(event) {
		const { name } = event.target;
		let { pageId, pages } = this.state;
		let length = pages.length;
		switch(name.toLowerCase()) {
			case 'previous':
					this.setState({
						pageId: --pageId % length
					});
				break;
			case 'next':
				this.setState({
					pageId: ++pageId % length
				});
				break;
			default:
				return
		}
	}

	componentWillMount() {
		const { onEnter, match } = this.props;
		const url = match.url;
		onEnter(url);
	}

	componentWillReceiveProps(nextProps) {
		const { chapters, chapterId, mangaId } = nextProps;
		const chapterKey = `/${mangaId}/${chapterId}`
		const chapter = chapters[chapterKey];
		const pages = chapter && chapter.pages;
		const name = chapter && chapter.name;
		if (pages) {
			this.setState({
				pages,
				name
			})
		}
		this.setState({chapterId})
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
				page={this.state.pageId}
				chapter={this.state.chapterId}
				onChange={this.handleChange}
				pages={pages}
				chapters={this.props.chaptersList} />
				<NavControls onClick={this.handleClick} />
				<img
				src={url}
				alt={pageId}
				style={style} />
				<NavControls onClick={this.handleClick} />
			</div>
		);
	}
}