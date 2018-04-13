import { connect } from 'react-redux';
import PageView from '../components/views/PageView';
import {fetchChapter, fetchManga, selectManga, selectChapter, saveSession} from '../redux/actions';

const getManga = (mangas, mangaId) => {
	const manga = mangas[mangaId] || {};
	return manga
}

const mapStateToProps = (state) => {
	return {
		manga: getManga(state.mangas.byId, state.selectedManga),
		chapters: state.chapters.byId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setPage: (mangaId, chapterId) => {
			dispatch(selectManga(mangaId));
			dispatch(selectChapter(chapterId));
		},
		saveSession: (mangaId, chapterId, pageId) => {
			dispatch(saveSession(mangaId, chapterId, pageId))
		},
		loadManga: (mangaId) => {
			dispatch(fetchManga(mangaId))
		},
		loadChapter: (chapterUrl) => {
			dispatch(fetchChapter(chapterUrl));
		}
	}
}

const PageViewContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PageView)

export default PageViewContainer 