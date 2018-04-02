import React from 'react';
import MangaCard from './MangaCard';

export default function Content({children}) {
	return (
		<div className="container">
			<div className="row">
				<MangaCard />
			</div>
		</div>
	);
}