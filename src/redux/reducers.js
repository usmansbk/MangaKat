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
	REQUEST_DOWNLOAD,
	RECEIVE_DOWNLOAD,
	RECEIVE_GENRE,
	RECEIVE_GENRE_MANGALIST,
	REQUEST_GENRE_MANGALIST,
	ADD_FILTER,
	REMOVE_FILTER,
	CLEAR_FILTER,
	MARK_AS_READ,
	CLEAR_NOTIFICATION,
	NOTIFY,
	DOWNLOAD_FAILED,
	SORT_BY
} from './actions';

function _updateGenres(state, ids, mangas) {
	ids.forEach(id => {
		state[id] = Object.assign({}, state[id], mangas[id])
	});
	return state;
}

function getNewChapters(newChapters, oldChapters) {
	if (!oldChapters) return [];
	const newLength = newChapters.length;
	const oldLength = oldChapters.length;
	let start = newLength - oldLength;
	if (!start) start = newLength;
	const ret = newChapters.slice(start).map(chapter => chapter.chapterId);
	return ret;
}

function mangas(state = {
	isFetching: false,
	isInvalidated: true,
	fetchedItemsCount: 0,
	sort: false,
	genres: [],
	itemsPerPage: 15,
	byId: {},
	ids: [],
	unread: false,
}, action) {
	switch(action.type) {
		case UPDATE_COUNT:
			return Object.assign({}, state, {
				fetchedItemsCount: action.fetchedItemsCount
			});
		case RECEIVE_GENRE:
			return Object.assign({}, state, {
				genres: [...(new Set(state.genres)).add(action.genreid)]
			});
		case REQUEST_MANGA: case REQUEST_GENRE_MANGALIST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case RECEIVE_MANGA:
			return Object.assign({}, state, {
				isFetching: false,
				byId: Object.assign({}, state.byId, {
					[action.mangaId]: Object.assign({}, state.byId[action.mangaId],Object.assign({}, action.manga, {
						mangaId: action.mangaId,
						downloading: [],
						isUpdated: true,
						newChapters: getNewChapters(action.manga.chapters, state.byId[action.mangaId].chapters),
					}))
				}),
				ids: [...(new Set(state.ids)).add(action.mangaId)]
			});		
		case MARK_AS_READ:
			let s = new Set(state.byId[action.mangaId].newChapters);
			s.delete(+action.chapterId);
			return Object.assign({}, state, {
				byId: Object.assign({}, state.byId, {
					[action.mangaId]: Object.assign({}, state.byId[action.mangaId], {
						newChapters: [...s]
					})
				})
			})
		case NOTIFY:
			return Object.assign({}, state, {
				unread: true
			});
		case CLEAR_NOTIFICATION:
			return Object.assign({}, state, {
				unread: false
			})
		case SAVE_LAST_SESSION:
			return Object.assign({}, state, {
				byId: Object.assign({}, state.byId, {
					[action.mangaId]: Object.assign({}, state.byId[action.mangaId], Object.assign({}, action.manga, {
						lastPage: action.pageId || 1,
						lastChapter: action.chapterId || 1,
					}))
				})
			})
		case RECEIVE_GENRE_MANGALIST:
			return Object.assign({}, state, {
				isFetching: false,
				byId: _updateGenres(state.byId, state.ids, action.byId),
				ids: [...(new Set(state.ids.concat(action.ids)))]
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
			let temp = new Set(state.byId[action.mangaId].downloading);
			temp.delete(action.chapterId);
			return Object.assign({}, state, {
				byId: Object.assign({}, state.byId, {
					[action.mangaId]: Object.assign({}, state.byId[action.mangaId], {
						chapters: updateChapterList(state.byId[action.mangaId], action.mangaId, action.chapterId),
						downloading: [...temp]
					}),
				})
			})
		case DOWNLOAD_FAILED:
			temp = new Set(state.byId[action.mangaId].downloading);
			temp.delete(action.chapterId);
			return Object.assign({}, state, {
				byId: Object.assign({}, state.byId, {
					[action.mangaId]: Object.assign({}, state.byId[action.mangaId], {
						downloading: [...temp]
					}),
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
		case SORT_BY:
			return Object.assign({}, state, {
				sort: !state.sort
			});
		default:
			return state
	}
}

function updateChapterList(manga, mangaId, chapterId) {
	const { chapters } = manga;
	let clone = [...chapters];
	let foundIndex = clone.findIndex((chapter) => chapter.chapterId === +chapterId);
	let chapter = clone[foundIndex];
	chapter.isDownloaded = true;
	clone[foundIndex] = chapter;
	return clone;
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
						isUpdated: true,
					})
				}),
			});
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

function filters(state=[], action) {
	switch(action.type) {
		case ADD_FILTER:
			return [...(new Set(state)).add(action.genreid)];
		case REMOVE_FILTER:
			let s = new Set(state);
			s.delete(action.genreid);
			return [...s];
		case CLEAR_FILTER:
			return []
		default:
			return state
	}
}

function version(state='1.0.4', action) {
	return state;
}
const mangaApp = combineReducers({
	version,
	favorites,
	selectedManga,
	selectedChapter,
	search,
	chapters,
	mangas,
	status,
	filters
});

export default mangaApp