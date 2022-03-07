import {SET_CART_COUNT, SET_LIKE_COUNT} from "./actions";

export function setLikeCount(payload) {
  return {
    type: SET_LIKE_COUNT,
    payload
  }
}


export function setCartCount(payload) {
  return {
    type: SET_CART_COUNT,
    payload
  }
}