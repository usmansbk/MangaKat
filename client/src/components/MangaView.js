import React from 'react';
import MangaInfoCard from './MangaInfoCard';
import ChapterList from './ChapterList';

export default function MangaView(props) {
	return (
		<React.Fragment>
			<MangaInfoCard src="sample-1.jpg" />
			<ChapterList />
		</React.Fragment>
	);
}