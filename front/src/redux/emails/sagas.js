import {call, put, takeLatest} from "redux-saga/effects";
import {SEND_EMAIL} from "./actions";
import {sendEmail} from "../../api";
import {loadingSet} from "./actionCreators";
import { toast } from 'react-toastify';


function* sendEmailSaga({email}) {
  try {
    yield put(loadingSet(true))
    yield call(sendEmail, email)
    toast.success('Подписка успешно оформлена!')
  } catch(e) {
    toast.error('Email не отправлен. Что-то пошло не так')
  } finally {
    yield put(loadingSet(false))
  }
}


export function* emailSaga() {
  yield takeLatest(SEND_EMAIL, sendEmailSaga)
}