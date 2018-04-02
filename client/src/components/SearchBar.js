import React from 'react';
import Icon from './common/Icon';

export default function SearchBar(props) {
	const style = {
		margin: "0px",
		display: "inlineBlock"
	};

	return (
		<form className="right" style={style} >
			<div className="input-field">
				<input type="search" name="search" placeholder="Find Manga" required />
				<label className="label-icon" htmlFor="search"><Icon name="search" /></label>
				<Icon name="close"/>
			</div>
		</form>
	);
}