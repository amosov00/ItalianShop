import {
  CLEAR_BRANDS_STATE,
  LOAD_BRANDS_SUCCESS,
  SWITCH_BRANDS_LOADING,
  LOAD_BRAND_SUCCESS,
  SET_BRANDS_PAGE
} from "./actions";


const initialState = {
  brands: [],
  brand: {},
  loading: false,
  text: null,
  pageCount: null,
  currentPage: 1
};

export function brandsReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_BRANDS_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case LOAD_BRAND_SUCCESS: {
      return {
        ...state,
        brand: action.payload
      }
    }
    case LOAD_BRANDS_SUCCESS: {
      return {
        ...state,
        brands: action.payload.data,
        pageCount: action.payload.pageCount
      }
    }
    case CLEAR_BRANDS_STATE: {
      return initialState
    }
    case SET_BRANDS_PAGE: {
      return {
        ...state,
        currentPage: action.page
      }
    }
    default: {
      return state
    }
  }
}