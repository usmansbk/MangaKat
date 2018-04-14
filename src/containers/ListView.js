import { connect } from 'react-redux';
import ListView from '../components/views/ListView';
import { fetchMangaList, searchManga, updateCount, selectSort} from '../redux/actions';

const getFetchedItemsCount = mangas => mangas.fetchedItemsCount;
const getItemsPerPage = mangas => mangas.itemsPerPage;

const mapDispatchToProps = (dispatch) => {
	return {
		onEnter: (isInvalidated) => {
			if (isInvalidated) {
				dispatch(fetchMangaList());
			}
		},
		cancelSearch: () => {
			dispatch(selectSort())
			dispatch(searchManga(''));
			dispatch(updateCount(0));
		},
		listSearch: (search) => {
			dispatch(updateCount(0));
			dispatch(searchManga(search));
		},
		sortBy: (sort) => {
			dispatch(selectSort(sort));
			dispatch(updateCount(0));
		}
	}
}

const mapStateToProps = (state) => {
	return {
		mangas: state.mangas,
		search: state.search,
		fetchedItemsCount: getFetchedItemsCount(state.mangas),
		itemsPerPage: getItemsPerPage(state.mangas),
		isInvalidated: state.mangas.isInvalidated,
		sort: state.mangas.sort,
		favorites: state.favorites
	}
}

const ListViewContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ListView)

export default ListViewContainer