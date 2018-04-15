import React from 'react';
import { Link } from 'react-router-dom';
import Fab from './common/Fab';
import Icon from './common/Icon';
import Badge from './common/Badge';

export default class ChapterList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: 'up',
		}
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		let { location } = this.state;
		location = location === 'down' ? 'up' : 'down';
		document.scrollingElement.scrollTop = location === 'down'?9999999999:0;
		this.setState({
			location
		});
	}


	render () {
		let { match, chapters, newChapters } = this.props;
		let direction = this.state.location === 'down' ? 'up' : 'down';
		let chaptersLinks = chapters.map((chapter, index) => {
			const isNew = newChapters.includes(chapter.chapterId);
			return (
				<Link
				className='collection-item'
				key={index}
				to={`${match.url}/${chapter.chapterId}/1`}>
					CH. {chapter.chapterId}: {chapter.name && chapter.name }
					{ chapter.isDownloaded && <Icon title='Available offline' name='offline_pin' position='right' /> }
					{ isNew ? <Badge /> : null}
				</Link>
			)
		});

		return (
			<div className="col s12 m6 l6">
				<div>
					<h5 id='up'>Chapters</h5>
				</div>
				<div className="collection">
					{chaptersLinks}
				</div>
				<div id='down'></div>
				<Fab name={`arrow_${direction}ward`} onClick={this.onClick} />
			</div>
		);
	}
}