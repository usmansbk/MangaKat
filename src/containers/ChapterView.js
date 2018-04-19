import { connect } from 'react-redux';
import localforage from 'localforage';
import ChapterView from '../components/views/ChapterView';
import { selectManga, fetchManga, selectChapter, fetchChapter, saveSession} from '../redux/actions';

const getChapters = (mangas, mangaId) => {
	const manga = mangas.byId[mangaId];
	return manga.chapters || [];
}

const getChapter = (chapters, mangaId, chapterId) => {
	const url = `/${mangaId}/${chapterId}`;
	const chapter = chapters.byId[url];
	return chapter || {};
}

const mapStateToProps = state => {
	return {
		manga: state.mangas.byId[state.selectedManga],
		chapters: getChapters(state.mangas, state.selectedManga),
		chapter: getChapter(state.chapters, state.selectedManga, state.selectedChapter)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadManga: (manga, mangaId) => {
			dispatch(selectManga(mangaId));
			if (!manga.isUpdated) dispatch(fetchManga(mangaId));
		},
		loadChapter: (mangaId, chapterId) => {
			const url = `/${mangaId}/${chapterId}`;
			dispatch(selectChapter(chapterId));
			dispatch(fetchChapter(url));
		},
		getOfflineChapter: (mangaId, chapterId) => {
			const url = `/${mangaId}/${chapterId}`;
			return localforage.getItem(url);
		},
		saveSession: (mangaId, chapterId, pageId) => {
			dispatch(saveSession(mangaId, chapterId, pageId));
		}
	}
}

const ChapterViewContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ChapterView);

export default ChapterViewContainer;