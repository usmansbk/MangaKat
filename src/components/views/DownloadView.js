import React from 'react';
import Preloader from '../common/Preloader';
import DownloadItem from '../common/DownloadItem';

export default class Download extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		event.preventDefault();
		const { saveChapter } = this.props;
		const { id, name } = event.currentTarget;
		const mangaId = id.substring(1, id.lastIndexOf('/'));
		if (name === 'file_download') saveChapter(mangaId, id);
	}

	render() {
		const {mangas, mangaId} = this.props;
		const manga = mangas[mangaId];
		const isDownloading = manga.downloading && manga.downloading.length > 0;
		let items = manga.chapters && manga.chapters.sort((a, b) => b.chapterId - a.chapterId)
			.filter(chapter => !chapter.isDownloaded)
			.map((chapter) => {
				const isDownloading = manga.downloading.indexOf(chapter.chapterId + "") > -1;
				return (
					<DownloadItem
						key={chapter.chapterId}
						onClick={this.onClick}
						mangaId={mangaId}
						chapterId={chapter.chapterId}
						isDownloading={isDownloading}
					>
						CH. {chapter.chapterId}: {chapter.name}
					</DownloadItem>
				)
			})
		return (
			<div className='col s12 l6 offset-l3'>
				{isDownloading && <Preloader className='indeterminate' />}
				<ul className='collection with-header'>
					<li className='collection-header'>
						<h4>{manga && manga.name}</h4>
					</li>
					{items}
				</ul>
			</div>
		);
	}
}