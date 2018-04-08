import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Dashboard from '../components/dashboard/Dashboard';
import { Status } from '../redux/actions';

const hasFailed = (status) => (status === Status.FETCH_MANGA_FAILURE) || (status === Status.FETCH_CHAPTER_FAILURE);
const getFetching = (mangas, chapters, status) => {
	return (mangas.isFetching || chapters.isFetching) && !hasFailed(status);
}

const getStatus = (status) => {
	return hasFailed(status);
}

const mapStateToProps = (state) => {
	return {
		isFetching: getFetching(state.mangas, state.chapters, state.status),
		failed: getStatus(state.status)
	}
}

const DashboardContainer = withRouter(connect(
	mapStateToProps
)(Dashboard))

export default DashboardContainer