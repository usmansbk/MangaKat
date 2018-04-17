import { connect } from 'react-redux'
import localforage from 'localforage'
import MangaView from '../components/views/MangaView'
import {
  selectManga,
  fetchManga,
  Status,
  searchManga,
  addFavorite,
  removeFavorite,
  fetchImage
} from '../redux/actions';

const hasFailed = (status) => (status === Status.FETCH_MANGA_FAILURE);
const getManga = (mangas, mangaName) => (mangas.byId[mangaName]);

const getLastRead = (mangas, mangaId) => {
  const manga = mangas[mangaId];
  let lastChapter = 1;
  let lastPage = 1;
  if (manga) {
    lastPage = manga.lastPage;
    lastChapter = manga.lastChapter;
  }
  const result = {
    lastChapter,
    lastPage
  }
  return result;
}
 
const mapStateToProps = state => {
	return {
		manga: getManga(state.mangas, state.selectedManga),
    favorites: state.favorites,
    mangas: state.mangas.byId,
    mangaId: state.selectedManga,
    failed: hasFailed(state.status),
    lastRead: getLastRead(state.mangas.byId, state.selectedManga),
	}
}

const mapDispatchToProps = dispatch => {
  return {
    refresh: (mangaId, mangas) => {
      dispatch(selectManga(mangaId));
      dispatch(searchManga(''));
      dispatch(fetchManga(mangaId));
    },
    handleFavorite: (mangaId, favorites) => {
      const hasManga = favorites.indexOf(mangaId) !== -1;
      hasManga? dispatch(removeFavorite(mangaId)) : dispatch(addFavorite(mangaId));
    },
    getCover: (url) => {
      return localforage.getItem(url).then(value => {
          if (value) return value;
          return fetchImage({url})
          .then(base64 => localforage.setItem(url, base64))
        })
    }
  }
}

const MangaViewContainer = connect(
	mapStateToProps,
  mapDispatchToProps
)(MangaView)

export default MangaViewContainer