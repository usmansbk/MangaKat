import React from 'react';

export default class AboutView extends React.Component {
	render() {
		// eslint-disable-next-line
		const facebookPage = 'https:\/\/facebook.com/usmansbk';
		// eslint-disable-next-line
		const github = 'https:\/\/github.com/usmansbk';
		return (
			<div>
			<h1>MangaKat</h1>
			<p className="flow-text">
			Do you like reading manga? Do you want to read you favorite manga
			offline in the web browser? MangaKat will meet your needs.
			</p>
			<p className="flow-text">
			To be able to read and find manga without too much hassle of the internet, I made
			my first manga reader app - MangaKat. To make it useful, I developed it as a
			progressive web app right from start, which means you can access and read your offline
			manga with the app on internet loss.
			</p>
			<p className="flow-text">I love manga and hope you will have a good time here.</p>
			<footer className='center-align'>
				<small>&copy;2018 </small>MIT <a href={facebookPage}>facebook</a> <a href={github}>GitHub</a>
			</footer>
			</div>
		);
	}
}