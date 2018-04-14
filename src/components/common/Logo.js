import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo(props) {
	return (
		<Link
		to='/'
		className="brand-logo hide-on-med-and-down"
		style={{marginLeft: '20px'}}
		>
			<img src='/favicon.ico' width='32' height='32' style={{verticalAlign: 'middle',marginRight: '10px' }}/>
			MangaKat
		</Link>
	);
}