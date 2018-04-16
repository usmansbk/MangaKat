import { connect } from 'react-redux';
import PageView from '../components/views/PageView';
import localforage from 'localforage';
import {fetchChapter, fetchManga, selectManga, selectChapter, saveSession, markRead} from '../redux/actions';

const getManga = (mangas, mangaId) => {
	const manga = mangas[mangaId] || {};
	return manga
}

const mapStateToProps = (state) => {
	return {
		manga: getManga(state.mangas.byId, state.selectedManga),
		chapters: state.chapters.byId,
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
		},
		markAsRead: (mangaId, chapterId) => {
			dispatch(markRead(mangaId, chapterId));
		},
		getSavedChapter: (chapterUrl) => {
			return localforage.getItem(chapterUrl).then(value => {
				return Promise.resolve(value);
			});
		} 
	}
}

const PageViewContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PageView)

export default PageViewContainer 