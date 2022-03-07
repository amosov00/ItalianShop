import {
  LOAD_CATEGORY_SUCCESS,
  LOAD_PRODUCTS_SUCCESS,
  SET_BRANDS_ID,
  SET_CATEGORY,
  SET_PRODUCTS_LOADING,
  SET_PRODUCTS_PAGE,
  SET_SUB_CATEGORY,
  SWITCH_CATEGORY_LOADING,
  SET_STYLES_ID,
  RESET_CATEGORY,
  SET_MIN_PRICE,
  SET_MAX_PRICE,
  SET_ORDER,
  SET_PRODUCT,
  SET_DISCOUNT_FILTER,
  SET_LIMIT,
  SET_TEXT
} from "./actions";

const initialState = {
  categoryTree: [],
  categoryTreeLoading: false,
  loading: false,
  currentPage: 1,
  products: [],
  category: null,
  sub_category: null,
  checkedBrandsId: [],
  checkedStylesId: [],
  minimalPrice: '',
  maximalPrice: '',
  order: null,
  product: {},
  discountFilter: false,
  limit: 9,
  text: null
};

export function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORY_SUCCESS: {
      return {
        ...state,
        categoryTree: action.payload
      }
    }
    case SWITCH_CATEGORY_LOADING: {
      return {
        ...state,
        categoryTreeLoading: action.payload
      }
    }
    case LOAD_PRODUCTS_SUCCESS: {
      return  {
        ...state,
        products: action.payload.data,
        totalPages: action.payload.pageCount,
      }
    }
    case SET_PRODUCTS_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case SET_PRODUCTS_PAGE: {
      return {
        ...state,
        currentPage: action.page
      }
    }
    case SET_CATEGORY: {
      return {
        ...state,
        category: action.payload
      }
    }
    case SET_SUB_CATEGORY: {
      return {
        ...state,
        sub_category: action.payload
      }
    }
    case SET_BRANDS_ID: {
      return {
        ...state,
        checkedBrandsId: action.payload
      }
    }
    case SET_STYLES_ID: {
      return {
        ...state,
        checkedStylesId: action.payload
      }
    }
    case RESET_CATEGORY: {
      return initialState
    }
    case SET_MIN_PRICE: {
      return {
        ...state,
        minimalPrice: action.payload
      }
    }
    case SET_MAX_PRICE: {
      return {
        ...state,
        maximalPrice: action.payload
      }
    }
    case SET_ORDER: {
      return {
        ...state,
        order: action.payload
      }
    }
    case SET_PRODUCT: {
      return {
        ...state,
        product: action.payload
      }
    }
    case SET_DISCOUNT_FILTER: {
      return {
        ...state,
        discountFilter: action.payload
      }
    }
    case SET_LIMIT: {
      return {
        ...state,
        limit: action.payload
      }
    }
    case SET_TEXT: {
      return {
        ...state,
        text: action.payload
      }
    }
    default: {
      return state
    }
  }
}