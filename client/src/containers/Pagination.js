import { connect } from 'react-redux';
import Pagination from '../components/Pagination';
import { updateCount } from '../redux/actions';

const getFetchedMangaCount = mangas => mangas.fetchedItemsCount;
const getMangaCount = (mangas) => mangas.ids.length;
const getItemsPerPage = mangas => mangas.itemsPerPage;

const mapDispatchToProps = (dispatch) => {
	return {
		updateFetchedItemsCount: (page, itemsPerPage) => {
			const next = page * itemsPerPage;
			dispatch(updateCount(next));
		}
	}
}

const mapStateToProps = (state) => {
	return {
		mangaCount: getMangaCount(state.mangas, state.search),
		fetchedItemsCount: getFetchedMangaCount(state.mangas),
		itemsPerPage: getItemsPerPage(state.mangas)
	}
}

const PaginationContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Pagination)

export default PaginationContainer