import { takeLatest, put, call } from "redux-saga/effects"
import { login } from "../actions/AuthAction"
import {Login} from "../constants/action";

function* loginSaga(data) {
    const result = yield call(login, data)
    if (result.status === 'success') {
        yield put({
            type: Login.LOGIN_SUCCESS,
            payload: result
        })
    } else {
        yield put({
            type: Login.LOGIN_FAILURE,
            payload: result.message
        })
    }
}

export function * watchLoginSaga() {
    yield takeLatest(Login.LOGIN, loginSaga)
}

export default [
    watchLoginSaga()
]