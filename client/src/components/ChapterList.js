import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from './common/ListItem';

export default function ChapterList({chapters}) {
	return (
		<div className="col s12 m6 l6">
			<ul className="collection with-header">
				<ListItem><b>Chapters</b></ListItem>
				<Link
				to='/manga/onepiece/1/1'
				><ListItem>Ch 1</ListItem></Link>
				{ chapters }
			</ul>
		</div>
	);
}