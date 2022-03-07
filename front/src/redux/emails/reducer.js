import {LOADING_SET} from "./actions";

const initialState = {
  loading: false,
};

export function emailReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_SET: {
      return {
        ...state,
        loading: action.payload,
      }
    }
    default: {
      return state
    }
  }
}