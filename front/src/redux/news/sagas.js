import {takeLatest, call, put, cancelled} from 'redux-saga/effects';
import {LOAD_NEWS, LOAD_SINGLE_NEWS, LOAD_RANDOM_NEWS} from "./actions";
import {
  loadNewsSuccess,
  setPreloadNewsData,
  setNewsLoadingToFalse,
  setSingleNews,
  setNewsLoadingToTrue
} from "./actionCreators";
import {createFetchAllNews, fetchNews, fetchSingleNews} from "../../api";



function* loadNewsSaga({page: {page, isNews}}) {
  const {fetchAllNews, fetchAllNewsToken} = createFetchAllNews()
  try {
    yield put(setPreloadNewsData(page))
    const {data: {data, pageCount}} = yield call(fetchAllNews, page, undefined, isNews)
    yield put(loadNewsSuccess(data, pageCount))
  } finally {
    if (yield cancelled()) {
      fetchAllNewsToken.cancel()
    } else {
      yield put(setNewsLoadingToFalse())
    }
  }
}


function* loadRandomNewsSaga() {
  const {fetchAllNews} = createFetchAllNews()
  const {data: {rowsCount: trueCount}} = yield call(fetchAllNews, 1, undefined, true)
  const {data: {rowsCount: falseCount}} = yield call(fetchAllNews, 1, undefined, false)
  const {data} = yield call(fetchNews)
  const ids = data.map(({id}) => id)
  const rowsCount = parseInt(trueCount) + parseInt(falseCount)
  const news = []
  if (rowsCount > 5) {
    for (let i = 1; i <= 5; i++) {
      const index = Math.floor(Math.random() * (ids.length - 1)) + 1
      const {data} = yield call(fetchSingleNews, ids[index])
      ids.splice(index, 1)
      news.push(data)
    }
  } else {
    for (let i = 1; i <= rowsCount; i++) {
      const index = Math.floor(Math.random() * (ids.length - 1)) + 1
      const {data} = yield call(fetchSingleNews, ids[index])
      ids.splice(index, 1)
      news.push(data)
    }
  }
  yield put(loadNewsSuccess(news, 0))
}


function* loadSingleNewsSaga({id}) {
  try {
    yield put(setNewsLoadingToTrue())
    const {data} = yield call(fetchSingleNews, id)
    yield put(setSingleNews(data))
  } finally {
    yield put(setNewsLoadingToFalse())
  }
}


export function* newsSaga() {
  yield takeLatest(LOAD_NEWS, loadNewsSaga)
  yield takeLatest(LOAD_SINGLE_NEWS, loadSingleNewsSaga)
  yield takeLatest(LOAD_RANDOM_NEWS, loadRandomNewsSaga)
}