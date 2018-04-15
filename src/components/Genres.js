import React from 'react';
import Checkbox from './common/Checkbox';

export default class Genres extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		const { name, checked } = event.target;
		const { filterByGenre, filters, cachedGenres } = this.props;
		filterByGenre(name, filters, checked, cachedGenres);
	}

	render() {
		const genres = [
			{"genreId":"action"},{"genreId":"adventure"},{"genreId":"comedy"},{"genreId":"demons"},
			{"genreId":"drama"},{"genreId":"ecchi"},{"genreId":"fantasy"},{"genreId":"gender-bender"},
			{"genreId":"harem"},{"genreId":"historical"},{"genreId":"horror"},{"genreId":"josei"},
			{"genreId":"magic"},{"genreId":"martial-arts"},{"genreId":"mature"},{"genreId":"mecha"},
			{"genreId":"military"},{"genreId":"mystery"},{"genreId":"one-shot"},{"genreId":"psychological"},
			{"genreId":"romance"},{"genreId":"school-life"},{"genreId":"sci-fi"},{"genreId":"seinen"},
			{"genreId":"shoujo"},{"genreId":"shoujoai"},{"genreId":"shounen"},{"genreId":"shounenai"},
			{"genreId":"slice-of-life"},{"genreId":"smut"},{"genreId":"sports"},{"genreId":"super-power"},
			{"genreId":"supernatural"},{"genreId":"tragedy"},{"genreId":"vampire"},{"genreId":"yaoi"},{"genreId":"yuri"}
		];
		const { filters } = this.props;
		const checkboxes = genres.map((genre, index) => {
			return <Checkbox checked={filters.includes(genre.genreId)} name={genre.genreId} onChange={this.onChange} key={index}>{genre.genreId}</Checkbox>
		});
		return (
			<div>
				<h4>Choose Genres</h4>
				<div className='row'>
					{checkboxes}
				</div>
			</div>
		);
	}
}