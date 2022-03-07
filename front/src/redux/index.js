import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./rootSaga";
import {newsReducer} from "./news/reducer";
import {emailReducer} from "./emails/reducer";
import {brandsReducer} from "./brands/reducer";
import {categoryReducer} from "./catalog/reducer";
import {basketReducer} from "./basket/reducer";

const sagaMiddleware = createSagaMiddleware()
 export const initialState = {};

export function appReducer(state = initialState) {
  return state;
}

const rootReducer = combineReducers({
  appReducer,
  newsReducer,
  emailReducer,
  brandsReducer,
  categoryReducer,
  basketReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);


export default store;