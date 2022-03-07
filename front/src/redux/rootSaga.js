import {fork} from 'redux-saga/effects';
import {newsSaga} from "./news/sagas";
import {emailSaga} from "./emails/sagas"
import {brandSaga} from "./brands/sagas";
import {categorySaga} from "./catalog/sagas";

export default function* rootSaga() {
  yield fork(newsSaga)
  yield fork(emailSaga)
  yield fork(brandSaga)
  yield fork(categorySaga)
}