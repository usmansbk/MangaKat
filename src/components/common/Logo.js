import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo(props) {
	return (
		<Link
		to='/'
		className="brand-logo hide-on-med-and-down"
		>
			MangaKat
		</Link>
	);
}