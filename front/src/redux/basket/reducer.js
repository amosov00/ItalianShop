import {SET_LIKE_COUNT, SET_CART_COUNT} from "./actions";

const initialState = {
  likeCount: 0,
  cartCount: 0
};

export function basketReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LIKE_COUNT: {
      return {
        ...state,
        likeCount: action.payload
      }
    }
    case SET_CART_COUNT: {
      return {
        ...state,
        cartCount: action.payload
      }
    }
    default: {
      return state
    }
  }
}