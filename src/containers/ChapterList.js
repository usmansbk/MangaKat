import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChapterList from '../components/ChapterList';

const getChapters = (mangas, mangaId) => {
	const manga = mangas[mangaId];
	if (!manga) return [];
	let chapters = manga.chapters;
	chapters = chapters && chapters.sort((a, b) => b.chapterId - a.chapterId);
	return chapters || [];
};

const mapStateToProps = (state) => {
	return {
		chapters: getChapters(state.mangas.byId, state.selectedManga)
	}
}

const ChapterListContainer = connect(
	mapStateToProps
)(ChapterList)

export default withRouter(ChapterListContainer); 