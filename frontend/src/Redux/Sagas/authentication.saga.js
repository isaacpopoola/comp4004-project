import { call, put, takeEvery } from "redux-saga/effects";
import ApiInstance from "../../Services/";

function* register(body) {
    const response = yield call(ApiInstance.postRegister, body);
    if (response.status === 200) {
        yield put("REGISTER_SUCCESS");
    } else {
        yield put("REGISTER_FAILED");
    }
}

function* login(body) {
    const response = yield call(ApiInstance.postLogin, body);
    if (response.status === 200) {
        yield put("LOGIN_SUCCESS");
    } else {
        yield put("LOGIN_FAILED");
    }
}

export const authenticationSagas = [
    takeEvery("REGISTER", register),
    takeEvery("LOGIN", login),
];
