import {put, takeLatest, call, select} from "redux-saga/effects";
import {LOAD_BRAND, LOAD_BRANDS} from "./actions";
import {loadBrandsSuccess, loadBrandSuccess, setBrandsPage, switchBrandsLoading} from "./actionCreators";
import {fetchBrand, fetchBrands} from "../../api";


function* loadBrandSaga({id}) {
  try {
    yield put(switchBrandsLoading(true))
    const {data} = yield call(fetchBrand, id)
    yield put(loadBrandSuccess(data))
  } finally {
    yield put(switchBrandsLoading(false))
  }
}

function* loadBrandsSaga({page: {page}}) {
  const text = yield select(s => s.categoryReducer.text)
  const limit = yield select(s => s.brandsReducer.limit)
  try {
    if (page) {
      yield put(setBrandsPage(page))
    }
    yield put(switchBrandsLoading(true))
    const {data: {data, pageCount}} = yield call(fetchBrands, page, limit, text)
    yield put(loadBrandsSuccess({data, pageCount}))
  } finally {
    yield put(switchBrandsLoading(false))
  }
}


export function* brandSaga() {
  yield takeLatest(LOAD_BRANDS, loadBrandsSaga)
  yield takeLatest(LOAD_BRAND, loadBrandSaga)
}