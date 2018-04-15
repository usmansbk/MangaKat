import React from 'react';

export default class AboutView extends React.Component {
	render() {
		// eslint-disable-next-line
		const facebookPage = 'https:\/\/facebook.com/usmansbk';
		// eslint-disable-next-line
		const github = 'https:\/\/github.com/usmansbk';
		return (
			<div>
			<h1>MangaKat <small>v1.0 beta</small></h1>
			<p className="flow-text">
			Do you like reading manga? Do you want to have a seamless experience reading manga
			in the web browser and without unnecessary network request? MangaKat will meet your needs.
			</p>
			<p className="flow-text">
			To be able to read and find manga without too much hassle of the internet, I made
			my first manga reader app - MangaKat. To make it useful, I developed it as a
			progressive web app right from start, which means you can access and read your cached
			manga on internet connection loss.
			</p>
			<p className='flow-text'>
			MangaKat is open source, which means you can contribute to the project.
			If you have any questions you can always contact me via facebook or twitter. I will make
			sure to reply you as soon as possible.
			</p>
			<p className="flow-text">I love manga and hope you will have a good time here.</p>
			<footer className='center-align'>
				<small>&copy;2018 </small>MIT <a href={facebookPage}>facebook</a> <a href={github}>GitHub</a>
			</footer>
			</div>
		);
	}
}