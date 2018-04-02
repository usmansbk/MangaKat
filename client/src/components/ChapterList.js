import React from 'react';
import ListItem from './common/ListItem';

export default function ChapterList({children}) {
	return (
		<div className="col s12 m6 l6">
			<ul className="collection with-header">
				<ListItem><b>Chapters</b></ListItem>
				{ children }
			</ul>
		</div>
	);
}