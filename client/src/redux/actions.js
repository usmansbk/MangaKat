import fetch from 'cross-fetch';
export const SEARCH_MANGA ='SEARCH_MANGA';
export const SELECT_CHAPTER = 'SELECT_CHAPTER';
export const SELECT_MANGA = 'SELECT_MANGA';
export const SET_STATUS = 'SET_STATUS';
export const REQUEST_MANGA = 'REQUEST_MANGA';
export const RECEIVE_MANGA = 'RECEIVE_MANGA';
export const REQUEST_CHAPTER = 'REQUEST_CHAPTER';
export const RECEIVE_CHAPTER = 'RECEIVE_CHAPTER';
export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const Status = {
	CLEAR: 'CLEAR',
	FETCH_MANGA_FAILURE: 'FETCH_MANGA_FAILURE',
	FETCH_MANGA_SUCCESS: 'FETCH_MANGA_SUCCESS',
	FETCH_CHAPTER_FAILURE: 'FETCH_CHAPTER_FAILURE',
	FETCH_CHAPTER_SUCCESS: 'FETCH_CHAPTER_SUCCESS'
};


const API_ENDPOINT = `https:\/\/doodle-manga-scraper.p.mashape.com`;
const API_KEY = 'BkGNvIgwAOmshhxjwHYdr1oJiRGdp1iRA5OjsndoBSE2Gb6Nqr';
const SOURCE = 'mangareader.net'

export function setStatus(status) {
	return {
		type: SET_STATUS,
		status
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
		const mangaId = chapterUrl.substring(1, chapterUrl.lastIndexOf('/'));
		const chapterId = chapterUrl.substring(chapterUrl.lastIndexOf('/')+1);
		dispatch(selectManga(mangaId));
		dispatch(selectChapter(chapterId));
		dispatch(requestChapter(chapterUrl));
		return apiRequest(url)
			.then(response => response.json())
			.then(json => dispatch(receiveChapter(chapterUrl, json)))
			.then(() => dispatch(fetchManga(mangaId)))
			.catch(error => dispatch(setStatus(Status.FETCH_CHAPTER_FAILURE)))
	}
}

export function fetchManga(mangaId) {
	const url = `${API_ENDPOINT}/${SOURCE}/manga/${mangaId}`;
	return dispatch => {
		dispatch(requestManga(mangaId));
		return apiRequest(url)
			.then(response => response.json())
			.then(json => dispatch(receiveManga(mangaId, json)))
			.catch(error => dispatch(setStatus(Status.FETCH_MANGA_FAILURE)))
	}
}