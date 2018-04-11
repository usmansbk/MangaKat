import { combineReducers } from 'redux';
import {
	SELECT_MANGA,
	SELECT_CHAPTER,
	SET_STATUS,
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
} from './actions';

function mangas(state = {
	isFetching: false,
	isInvalidated: true,
	fetchedItemsCount: 0,
	itemsPerPage: 50,
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
						isUpdated: true,
						lastPage: action.pageId || 1,
						lastChapter: action.chapterId || 1,
					}))
				}),
				ids: [...(new Set(state.ids)).add(action.mangaId)]
			});
		case REQUEST_MANGALIST:
			return Object.assign({}, state, {
				isInvalidated: false,
				isFetching: true
			});
		case RECEIVE_MANGALIST:
			return Object.assign({}, state, {
				isFetching: false,
				isInvalidated: false,
				byId: action.byId,
				ids: action.ids
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
			})
		default:
			return state
	}
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