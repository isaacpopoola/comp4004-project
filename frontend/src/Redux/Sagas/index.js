import { all } from 'redux-saga/effects'

import { authenticationSagas } from './authentication.saga'

export default function* rootSaga() {
  yield all([authenticationSagas])
}
