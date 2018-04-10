import fetch from 'cross-fetch';
import normalizeList from './helpers/normalizeList';

export const SEARCH_MANGA ='SEARCH_MANGA';
export const SELECT_CHAPTER = 'SELECT_CHAPTER';
export const REQUEST_MANGALIST = 'REQUEST_MANGALIST';
export const RECEIVE_MANGALIST = 'RECEIVE_MANGALIST';
export const SELECT_MANGA = 'SELECT_MANGA';
export const SET_STATUS = 'SET_STATUS';
export const REQUEST_MANGA = 'REQUEST_MANGA';
export const RECEIVE_MANGA = 'RECEIVE_MANGA';
export const REQUEST_CHAPTER = 'REQUEST_CHAPTER';
export const RECEIVE_CHAPTER = 'RECEIVE_CHAPTER';
export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const UPDATE_COUNT = 'UPDATE_COUNT';
export const FAVORITE_MANGA = 'FAVORITE_MANGA';
export const UNFAVORITE_MANGA = 'UNFAVORITE_MANGA';
export const SAVE_LAST_SESSION = 'SAVE_LAST_SESSION';
export const Status = {
	CLEAR: 'CLEAR',
	FETCHING: 'FETCHING',
	FETCH_MANGA_FAILURE: 'FETCH_MANGA_FAILURE',
	FETCH_MANGA_SUCCESS: 'FETCH_MANGA_SUCCESS',
	FETCH_CHAPTER_FAILURE: 'FETCH_CHAPTER_FAILURE',
	FETCH_CHAPTER_SUCCESS: 'FETCH_CHAPTER_SUCCESS',
	FETCH_MANGALIST_FAILURE: 'FETCH_MANGALIST_FAILURE'
};


const API_ENDPOINT = `https:\//doodle-manga-scraper.p.mashape.com`;
const API_KEY = 'BkGNvIgwAOmshhxjwHYdr1oJiRGdp1iRA5OjsndoBSE2Gb6Nqr';
const SOURCE = 'mangareader.net'

export function saveSession(mangaId, chapterId, pageId) {
	return {
		type: SAVE_LAST_SESSION,
		mangaId,
		chapterId,
		pageId
	}
}

export function updateCount(fetchedItemsCount) {
	return {
		type: UPDATE_COUNT,
		fetchedItemsCount
	}
}
export function setStatus(status) {
	return {
		type: SET_STATUS,
		status
	}
}

export function addFavorite(mangaId) {
	return {
		type: FAVORITE_MANGA,
		mangaId
	}
}

export function removeFavorite(mangaId) {
	return {
		type: UNFAVORITE_MANGA,
		mangaId
	}
}

export function selectChapter(chapterId) {
	return {
		type: SELECT_CHAPTER,
		chapterId
	}
}

export function selectManga(mangaId) {
	return {
		type: SELECT_MANGA,
		mangaId
	}
}

export function searchManga(mangaId) {
	return {
		type: SEARCH_MANGA,
		mangaId
	}
}

function requestManga(mangaId) {
	return {
		type: REQUEST_MANGA,
		mangaId
	}
}

function receiveManga(mangaId, manga) {
	return {
		type: RECEIVE_MANGA,
		mangaId,
		manga
	}
}

function requestMangaList() {
	return {
		type: REQUEST_MANGALIST
	}
}

function receiveMangaList(byId, ids) {
	return {
		type: RECEIVE_MANGALIST,
		byId,
		ids
	}
}

function requestChapter(chapterId) {
	return {
		type: REQUEST_CHAPTER,
		chapterId
	}
}

function receiveChapter(chapterId, chapter) {
	return {
		type: RECEIVE_CHAPTER,
		chapterId,
		chapter
	}
}

function apiRequest(url) {
	return fetch(url, {
		mode: 'cors',
		headers: {
			"Accept": "text/plain",
			"X-Mashape-Key": `${API_KEY}`
		}
	});
}

export function fetchChapter(chapterUrl) {
	const url = `${API_ENDPOINT}/${SOURCE}/manga${chapterUrl}`;
	return dispatch => {
		dispatch(requestChapter(chapterUrl));
		dispatch(setStatus(Status.FETCHING));
		return apiRequest(url)
			.then(response => response.json())
			.then(json => dispatch(receiveChapter(chapterUrl, json)))
			.catch(error => dispatch(setStatus(Status.FETCH_CHAPTER_FAILURE)))
	}
}

export function fetchManga(mangaId) {
	const url = `${API_ENDPOINT}/${SOURCE}/manga/${mangaId}`;
	return dispatch => {
		dispatch(requestManga(mangaId));
		dispatch(setStatus(Status.FETCHING));
		return apiRequest(url)
			.then(response => response.json())
			.then(json => {
				if (!json) throw new Error('Manga not found');
				return dispatch(receiveManga(mangaId, json));
			})
			.catch(error => dispatch(setStatus(Status.FETCH_MANGA_FAILURE)))
	}
}

export function fetchMangaList() {
	const url = `${API_ENDPOINT}/${SOURCE}?cover=1&info=1`;
	return dispatch => {
		dispatch(requestMangaList());
		dispatch(setStatus(Status.FETCHING));
		return apiRequest(url)
			.then(response => response.json())
			.then(json => {
				if (!json) throw new Error('Mangas not found');
				const normalizedList = normalizeList(json);
				const byId = normalizedList.entities.manga;
				const ids = normalizedList.result;
				return dispatch(receiveMangaList(byId, ids));
			})
			.catch(error => dispatch(setStatus(Status.FETCH_MANGALIST_FAILURE)))
	}
}