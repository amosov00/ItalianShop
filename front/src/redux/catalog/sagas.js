import {LOAD_CATEGORY, LOAD_PRODUCTS, LOAD_PRODUCT} from "./actions";
import {call, cancelled, put, takeLatest, select} from "redux-saga/effects";
import {createFetchAllProducts, fetchCategory, fetchProduct} from "../../api";
import {
  loadCategorySuccess,
  loadProductsSuccess, setProduct,
  setProductsLoading,
  setProductsPage,
  switchCategoryLoading
} from "./actionCreators";

function* loadCategorySaga() {
  try {
    yield put(switchCategoryLoading(true))
    const {data} = yield call(fetchCategory)
    const result = data.map(item => ({
      ...item,
      opened: false,
      children: item.children.map(item => ({
        ...item,
        checked: false
      }))
    }))
    yield put(loadCategorySuccess(result))
  } finally {
    yield put(switchCategoryLoading(false))
  }
}


function* loadProductsSaga({page: {page}}) {
  const {fetchAllProducts, fetchAllProductsToken} = createFetchAllProducts()
  const category = yield select(store => store.categoryReducer.category)
  const sub_category = yield select(store => store.categoryReducer.sub_category)
  const checkedBrandsId = yield select(s => s.categoryReducer.checkedBrandsId)
  const checkedStylesId = yield select(s => s.categoryReducer.checkedStylesId)
  const minimalPrice = yield select(s => s.categoryReducer.minimalPrice)
  const maximalPrice = yield select(s => s.categoryReducer.maximalPrice)
  const discountFilter = yield select(s => s.categoryReducer.discountFilter)
  const text = yield select(s => s.categoryReducer.text)
  const limit = yield select(s => s.categoryReducer.limit)
  const order = yield select(s => s.categoryReducer.order)
  try {
    yield put(setProductsPage(page))
    yield put(setProductsLoading(true))
    const {data: {data, pageCount}} = yield call(
      fetchAllProducts,
      page,
      limit,
      category,
      sub_category,
      checkedBrandsId,
      minimalPrice,
      maximalPrice,
      checkedStylesId,
      order,
      discountFilter,
      text
    )
    yield put(loadProductsSuccess(data, pageCount))
  } finally {
    if (yield cancelled()) {
      fetchAllProductsToken.cancel()
    } else {
      yield put(setProductsLoading(false))
    }
  }
}

function* loadProductSaga({id}) {
  yield put(setProductsLoading(true))
  try {
    const {data} = yield call(fetchProduct, id)
    yield put(setProduct(data))
  } finally {
    yield put(setProductsLoading(false))
  }
}


export function* categorySaga() {
  yield takeLatest(LOAD_CATEGORY, loadCategorySaga)
  yield takeLatest(LOAD_PRODUCTS, loadProductsSaga)
  yield takeLatest(LOAD_PRODUCT, loadProductSaga)
}