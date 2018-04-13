import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DownloadView from '../components/views/DownloadView';
import { downloadChapter } from '../redux/actions';

const mapStateToProps = (state) => {
	return {
		mangas: state.mangas.byId,
		mangaId: state.selectedManga
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		saveChapter: (mangaId, url) => {
			dispatch(downloadChapter(mangaId, url));
		}
	}
}

const DownloadViewContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(DownloadView)

export default withRouter(DownloadViewContainer);