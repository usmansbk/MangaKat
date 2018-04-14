import React from 'react';

export default function NavHeader(props) {
	const { className } = props;
	return (
		<li>
			<div className={`user-view white-text valign-wrapper ${className}`}>
				<h3>MangaKat</h3>
			</div>
		</li>
	);
}