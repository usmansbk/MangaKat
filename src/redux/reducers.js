import { combineReducers } from 'redux';
import {
	SELECT_MANGA,
	SELECT_CHAPTER,
	SET_STATUS,
	SET_IMAGE,
	REQUEST_MANGA,
	RECEIVE_MANGA,
	REQUEST_MANGALIST,
	RECEIVE_MANGALIST,
	REQUEST_CHAPTER,
	RECEIVE_CHAPTER,
	FAVORITE_MANGA,
	UNFAVORITE_MANGA,
	SAVE_LAST_SESSION,
	SEARCH_MANGA,
	UPDATE_COUNT,
	REQUEST_DOWNLOAD,
	RECEIVE_DOWNLOAD,
} from './actions';

function mangas(state = {
	isFetching: false,
	isInvalidated: true,
	fetchedItemsCount: 0,
	itemsPerPage: 15,
	byId: {},
	ids: [],
}, action) {
	switch(action.type) {
		case UPDATE_COUNT:
			return Object.assign({}, state, {
				fetchedItemsCount: action.fetchedItemsCount
			});
		case REQUEST_MANGA:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case RECEIVE_MANGA: case SAVE_LAST_SESSION:
			return Object.assign({}, state, {
				isFetching: false,
				byId: Object.assign({}, state.byId, {
					[action.mangaId]: Object.assign({}, state.byId[action.mangaId],Object.assign({}, action.manga, {
						mangaId: action.mangaId,
						downloading: [],
						isUpdated: true,
						lastPage: action.pageId || 1,
						lastChapter: action.chapterId || 1,
					}))
				}),
				ids: [...(new Set(state.ids)).add(action.mangaId)]
			});
		case REQUEST_MANGALIST:
			return Object.assign({}, state, {
				isInvalidated: true,
				isFetching: true
			});
		case RECEIVE_MANGALIST:
			return Object.assign({}, state, {
				isFetching: false,
				isInvalidated: false,
				byId: action.byId,
				ids: action.ids
			});
		case RECEIVE_DOWNLOAD:
			return Object.assign({}, state, {
				byId: Object.assign({}, state.byId, {
					[action.mangaId]: Object.assign({}, state.byId[action.mangaId], {
						downloading: [...(new Set(state.byId[action.mangaId].downloading)).delete(action.chapterId)]
					})
				})
			})
		case REQUEST_DOWNLOAD:
			return Object.assign({}, state, {
				byId: Object.assign({}, state.byId, {
					[action.mangaId]: Object.assign({}, state.byId[action.mangaId], {
						downloading: [...(new Set(state.byId[action.mangaId].downloading)).add(action.chapterId)]
					})
				})
			})
		default:
			return state
	}
}

function chapters(state = {
		isFetching: false,
		byId: {}
	}, action) {
	switch(action.type) {
		case REQUEST_CHAPTER:
			return Object.assign({}, state, {
				isFetching: true
			})
		case RECEIVE_CHAPTER:
			return Object.assign({}, state, {
				isFetching: false,
				byId: Object.assign({}, state.byId, {
					[action.chapterId]: Object.assign({}, action.chapter, {
						isUpdated: true
					})
				}),
			});
		case SET_IMAGE:
			return Object.assign({}, state, {
				byId: Object.assign({}, state.byId, {
					[action.chapterUrl]: Object.assign({}, state.byId[action.chapterUrl], {
						pages: setImage(state.byId[action.chapterUrl], action.pageId, action.imageUrl)
					})
				})
			})
		default:
			return state
	}
} 

function setImage(chapter, pageId, imageUrl) {
	const pages = chapter.pages;
	let ret = [];
	if (pages) {
		ret = [...pages];
		ret[pageId].url = imageUrl;
		return ret;
	}
	return chapter;
}

function favorites(state = [], action) {
	switch(action.type) {
		case FAVORITE_MANGA:
			return [...(new Set(state)).add(action.mangaId)];
		case UNFAVORITE_MANGA:
			let s = new Set(state);
			s.delete(action.mangaId);
			return [...s];
		default:
			return state
	}
}

function selectedManga(state = null, action) {
	switch(action.type) {
		case SELECT_MANGA:
				return action.mangaId
		default:
			return state
	}
}

function selectedChapter(state = 1, action) {
	switch(action.type) {
		case SELECT_CHAPTER:
			return action.chapterId
		default:
			return state
	}
}

function status(state='CLEAR', action) {
	switch(action.type) {
		case SET_STATUS:
			return action.status
		default:
			return state
	}
}

function search(state='', action) {
	switch(action.type) {
		case SEARCH_MANGA:
			return action.mangaId
		default:
			return state
	}
}

const mangaApp = combineReducers({
	favorites,
	selectedManga,
	selectedChapter,
	search,
	chapters,
	mangas,
	status
});

export default mangaApp