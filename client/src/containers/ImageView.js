import { connect } from 'react-redux';
import ImageView from '../components/views/ImageView';
import {fetchChapter} from '../redux/actions';

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

const mapStateToProps = (state) => {
	return {
		mangaName: getMangaName(state.mangas, state.selectedManga),
		mangaId: state.selectedManga,
		chapterId: state.selectedChapter,
		pageId: state.selectedPage,
		chapters: getChapters(state.chapters),
		chaptersList: getList(state.mangas.byId, state.selectedManga)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onEnter: (url) => {
			dispatch(fetchChapter(url));
		}
	}
}

const ImageViewContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageView)

export default ImageViewContainer