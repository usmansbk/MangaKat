import React from 'react';
import { Link } from 'react-router-dom';
import MangaCard from './MangaCard';

export default function CardsView(props) {
	return (
		<React.Fragment>
			<Link to='/manga'><MangaCard src="sample-1.jpg"/></Link>
		</React.Fragment>
	);
}