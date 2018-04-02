import React from 'react';
import M from 'materialize-css';

export default class AboutModal extends React.Component {
	componentDidMount() {
		M.Modal.init(document.querySelector('.modal'));
	}

	render() {
		return (
			<div className="modal" id="about">
				<div className="modal-content">
					<h4>About Us</h4>
					<p>
						There is no 'US', just <b>Usman</b>
						At my own liesure time, I built this manga reading app --- MangaKat.
						To make it more useful, you can download your favorite manga and later read offline.
					</p>
					<p>I love manga and hope you will have a good time here.</p>
					<h4>Disclaimer</h4>
					<p>
						All manga belong to their respective copyright owners.<br/>
						MangaKat does not have any affiliation with content providers.<br/>
						MangaKat does not have the right to change users favorite data without
						the content providers permission
					</p>
				</div>
				<div className="modal-footer">
					<small>&copy; 2018</small>
					<small><a href="https://github.com/usmansbk">GitHub</a></small>
				</div>
			</div>
		);
	}
}