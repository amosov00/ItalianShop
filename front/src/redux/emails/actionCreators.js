import {LOADING_SET, SEND_EMAIL} from "./actions";


export function sendEmailAction(email) {
  return {
    type: SEND_EMAIL,
    email
  }
}

export function loadingSet(payload) {
  return {
    type: LOADING_SET,
    payload
  }
}




