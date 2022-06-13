import { takeLatest, put, call } from "redux-saga/effects";
import { fetchSetting, updateSetting } from "../actions/SettingAction";
import {Setting} from "../constants/action";

function* fetchSettingSaga(payload) {
    const result = yield call(fetchSetting, payload)
    if (result.status === 'success') {
        yield put({
            type: Setting.FETCH_SETTING_SUCCESS,
            payload: result.data
        })
    } else {
        yield put({
            type: Setting.FETCH_SETTING_FAILURE,
            payload: result
        })
    }
}

function* updateSettingSaga(payload) {
    const result = yield call(updateSetting, payload)
    if (result.status === 'success') {
        yield put({
            type: Setting.UPDATE_SETTING_SUCCESS,
            payload: result.message
        })
    } else {
        yield put({
            type: Setting.UPDATE_SETTING_FAILURE,
            payload: result
        })
    }
}

export function* watchFetchSettingSaga() {
    yield takeLatest(Setting.FETCH_SETTING, fetchSettingSaga)
}

export function* watchUpdateSettingSaga() {
    yield takeLatest(Setting.UPDATE_SETTING, updateSettingSaga)
}

export default [
    watchFetchSettingSaga(),
    watchUpdateSettingSaga()
]