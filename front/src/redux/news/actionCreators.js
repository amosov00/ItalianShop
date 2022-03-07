import {
  LOAD_NEWS,
  LOAD_NEWS_SUCCESS,
  SET_PRELOAD_NEWS_DATA,
  SET_NEWS_LOADING_TO_FALSE,
  CLEAR_NEWS_STATE,
  SET_SINGLE_NEWS,
  LOAD_SINGLE_NEWS,
  LOAD_RANDOM_NEWS,
  SET_NEWS_LOADING_TO_TRUE
} from "./actions";

export function loadNews(page) {
  return {
    type: LOAD_NEWS,
    page,
  }
}

export function loadSingleNews(id) {
  return {
    type: LOAD_SINGLE_NEWS,
    id
  }
}

export function loadRandomNews() {
  return {
    type: LOAD_RANDOM_NEWS,
  }
}

export function setSingleNews(payload) {
  return {
    type: SET_SINGLE_NEWS,
    payload
  }
}

export function clearNewsState() {
  return {
    type: CLEAR_NEWS_STATE
  }
}

export function setNewsLoadingToFalse() {
  return {
    type: SET_NEWS_LOADING_TO_FALSE
  }
}


export function setNewsLoadingToTrue() {
  return {
    type: SET_NEWS_LOADING_TO_TRUE
  }
}

export function loadNewsSuccess(data, pageCount) {
  return {
    type: LOAD_NEWS_SUCCESS,
    payload: {
      data,
      pageCount
    }
  }
}

export function setPreloadNewsData(page) {
  return {
    type: SET_PRELOAD_NEWS_DATA,
    payload: {
      loading: true,
      page
    }
  }
}