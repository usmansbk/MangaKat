import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Dashboard from '../components/dashboard/Dashboard';
import { Status, setStatus, fetchManga } from '../redux/actions';

const isFetching = (status) => {
	return (status === Status.FETCHING);
}
const hasFailed = (status) => (status === Status.FETCH_MANGA_FAILURE) || (status === Status.FETCH_CHAPTER_FAILURE) || (status === Status.FETCH_MANGALIST_FAILURE);
const getFetching = (mangas, chapters, status) => {
	return (mangas.isFetching || chapters.isFetching) && isFetching(status);
}

const getStatus = (status) => {
	return hasFailed(status);
}

const mapStateToProps = (state) => {
	return {
		isFetching: getFetching(state.mangas, state.chapters, state.status),
		failed: getStatus(state.status),
		hasUnread: state.mangas.unread,
		favorites: state.favorites,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		clearError: () => dispatch(setStatus(Status.CLEAR)),
		fetchUpdates: (favorites) => {
			favorites.forEach(mangaId => dispatch(fetchManga(mangaId)));
		}
	}
}

const DashboardContainer = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard))

export default DashboardContainer