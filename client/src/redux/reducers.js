import { combineReducers } from 'redux';
import {
	SELECT_MANGA,
	SELECT_CHAPTER,
	SET_STATUS,
	REQUEST_MANGA,
	RECEIVE_MANGA,
	REQUEST_CHAPTER,
	RECEIVE_CHAPTER,
	SEARCH_MANGA,
} from './actions';
import normalizeList from './helpers/normalizeList';
import mangaList from './helpers/mangaList';

const normalizedList = normalizeList(mangaList);

function mangas(state = {
	isFetching: false,
	fetchedItemCount: 200,
	nextItemId: 0,
	byId: normalizedList.entities.manga,
	ids: normalizedList.result,
}, action) {
	switch(action.type) {
		case REQUEST_MANGA:
			return Object.assign({}, state, {
				isFetching: true,
			})
		case RECEIVE_MANGA:
			return Object.assign({}, state, {
				isFetching: false,
				byId: Object.assign({}, state.byId, {
					[action.mangaId]: Object.assign({}, state.byId[action.mangaId], action.manga)
				}),
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
					[action.chapterId]: action.chapter
				}),
			})
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

function search(state=null, action) {
	switch(action.type) {
		case SEARCH_MANGA:
			return action.mangaId
		default:
			return state
	}
}

const mangaApp = combineReducers({
	selectedManga,
	selectedChapter,
	search,
	chapters,
	mangas,
	status
});

export default mangaApp