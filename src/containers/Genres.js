import { connect } from 'react-redux';
import Genres from '../components/Genres';
import { addFilter, removeFilter, fetchMangaListByGenre, updateCount} from '../redux/actions';

const mapStateToProps = (state) => {
	return {
		filters: state.filters,
		cachedGenres: state.mangas.genres
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		filterByGenre: (genreId, filters, checked, cachedGenres) => {
			if (checked) {
				if (!cachedGenres.includes(genreId))dispatch(fetchMangaListByGenre(genreId));
				dispatch(addFilter(genreId));
				dispatch(updateCount(0));
			}
			if (!checked) dispatch(removeFilter(genreId));
		}
	}
}

const GenresContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Genres)

export default GenresContainer;