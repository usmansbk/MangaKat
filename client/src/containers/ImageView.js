import { connect } from 'react-redux';
import ImageView from '../components/views/ImageView';
import {fetchChapter, fetchManga, selectManga, selectChapter, saveSession} from '../redux/actions';

const getMangaName = (mangas, currentManga) => {
	const manga = mangas.byId[currentManga];
	return manga && manga.name;
};

const getList = (mangas, mangaId) => {
	const manga = mangas[mangaId];
	const chapters = manga && manga.chapters;
	return  chapters || [];
}

const getChapters = (chapters) => chapters.byId;

const getUpdateStatus = (mangas, mangaId) => {
	const manga = mangas[mangaId];
	return manga && manga.isUpdated;
}

const getLastPage = (mangas, mangaId) => {
	return mangas[mangaId].lastPage || 1;
}
const mapStateToProps = (state) => {
	return {
		mangaName: getMangaName(state.mangas, state.selectedManga),
		mangaId: state.selectedManga,
		chapterId: state.selectedChapter,
		pageId: state.selectedPage,
		chapters: getChapters(state.chapters),
		chaptersList: getList(state.mangas.byId, state.selectedManga),
		isUpdated: getUpdateStatus(state.mangas.byId, state.selectedManga),
		lastPage: getLastPage(state.mangas.byId, state.selectedManga)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onEnter: (url, mangaId, isUpdated, isChapterUpdated, pageId) => {
			const chapterId = url.substring(url.lastIndexOf('/')+1);
			dispatch(selectManga(mangaId));
			dispatch(selectChapter(chapterId));
			if (!isChapterUpdated) dispatch(fetchChapter(url));
			if (!isUpdated) dispatch(fetchManga(mangaId));
		},
		saveSession(mangaId, chapterId, pageId) {
			dispatch(saveSession(mangaId, chapterId, pageId))
		}
	}
}

const ImageViewContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageView)

export default ImageViewContainer