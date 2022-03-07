import {
  LOAD_NEWS_SUCCESS,
  SET_NEWS_LOADING_TO_FALSE,
  SET_PRELOAD_NEWS_DATA,
  CLEAR_NEWS_STATE,
  SET_SINGLE_NEWS,
  SET_NEWS_LOADING_TO_TRUE,
} from "./actions";

const initialState = {
  news: [],
  totalPages: null,
  currentPage: 1,
  loading: false,
  singleNews: {}
};

export function newsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NEWS_SUCCESS: {
      return {
        ...state,
        news: action.payload.data,
        totalPages: action.payload.pageCount,
      }
    }
    case CLEAR_NEWS_STATE: {
      return {
        ...state,
        news: [],
        loading: false,
        singleNews: {},
        totalPages: null,
        currentPage: 1,
      }
    }
    case SET_NEWS_LOADING_TO_FALSE: {
      return {
        ...state,
        loading: false
      }
    }
    case SET_NEWS_LOADING_TO_TRUE: {
      return {
        ...state,
        loading: true
      }
    }
    case SET_PRELOAD_NEWS_DATA: {
      return {
        ...state,
        currentPage: action.payload.page,
        loading: true
      }
    }
    case SET_SINGLE_NEWS: {
      return {
        ...state,
        singleNews: action.payload
      }
    }
    default: {
      return state
    }
  }
}