import React from 'react';
import { Link } from 'react-router-dom';

export default function ChapterList(props) {
	let { chapters, match } = props;
	chapters = chapters && chapters.map((chapter, index) => (
		<Link
		className='collection-item'
		key={index}
		to={`${match.url}/${chapter.chapterId}`}>
			CH. {chapter.chapterId}{chapter.name && `: ${chapter.name}`} 
		</Link>
	));

	return (
		<div className="col s12 m6 l6">
			<div>
				<h5>Chapters</h5>
			</div>
			<div className="collection">
				{chapters}
			</div>
		</div>
	);
}