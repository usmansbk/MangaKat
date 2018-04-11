import { connect } from 'react-redux';
import ListView from '../components/views/ListView';
import { fetchMangaList, searchManga, updateCount} from '../redux/actions';

const getFetchedItemsCount = mangas => mangas.fetchedItemsCount;
const getItemsPerPage = mangas => mangas.itemsPerPage;

const mapDispatchToProps = (dispatch) => {
	return {
		onEnter: (isInvalidated) => {
			if (isInvalidated) dispatch(fetchMangaList());
		},
		cancelSearch: () => {
			dispatch(searchManga(''));
			dispatch(updateCount(0));
		},
		listSearch: (search) => {
			dispatch(searchManga(search));
		}
	}
}

const mapStateToProps = (state) => {
	return {
		mangas: state.mangas,
		search: state.search,
		fetchedItemsCount: getFetchedItemsCount(state.mangas),
		itemsPerPage: getItemsPerPage(state.mangas),
		isInvalidated: state.mangas.isInvalidated
	}
}

const ListViewContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ListView)

export default ListViewContainer