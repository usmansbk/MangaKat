import { connect } from 'react-redux'
import MangaContent from '../components/MangaContent'
import {selectManga, fetchManga} from '../redux/actions';

const getManga = (mangas, mangaName) => (mangas.byId[mangaName])

const mapStateToProps = state => {
	return {
		manga: getManga(state.mangas, state.selectedManga),
	}
}

const mapDispatchToProps = dispatch => {
  return {
    onEnter: (mangaId) => {
      dispatch(selectManga(mangaId));
      dispatch(fetchManga(mangaId));
    }
  }
}

const MangaContentContainer = connect(
	mapStateToProps,
  mapDispatchToProps
)(MangaContent)

export default MangaContentContainer