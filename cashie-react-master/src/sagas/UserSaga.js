import { takeLatest, put, call } from "redux-saga/effects"
import {fetchUsers, createUser, updateUser, deleteUser, fetchSingleUser} from "../actions/UserAction";
import {User} from "../constants/action";

function* fetchUsersSaga({ payload }) {
    const result = yield call(fetchUsers, payload)
    if (result.status === 'success') {
        yield put({
            type: User.FETCH_ALL_USER_SUCCESS,
            payload: result.data
        })
    } else {
        yield put({
            type: User.FETCH_ALL_USER_FAILURE,
            payload: result
        })
    }
}

function* fetchSingleUserSaga({ payload }) {
    const result = yield call(fetchSingleUser, payload)
    if (result.status === 'success') {
        yield put({
            type: User.FETCH_SINGLE_USER_SUCCESS,
            payload: result.data
        })
    } else {
        yield put({
            type: User.FETCH_SINGLE_USER_FAILURE,
            payload: result
        })
    }
}

function* createUserSaga(data) {
    const result = yield call(createUser, data)
    if (result.status === 'success') {
        yield put({
            type: User.CREATE_USER_SUCCESS,
            payload: result
        })
    } else {
        yield put({
            type: User.CREATE_USER_FAILURE,
            payload: result.message
        })
    }
}

function* updateUserSaga(data) {
    const result = yield call(updateUser, data)
    if (result.status === 'success') {
        yield put({
            type: User.UPDATE_USER_SUCCESS,
            payload: result.message
        })
    } else {
        yield put({
            type: User.UPDATE_USER_FAILURE,
            payload: result.message
        })
    }
}

function* deleteUserSaga(id) {
    const result = yield call(deleteUser, id)
    if (result.status === 'success') {
        yield put({
            type: User.DELETE_USER_SUCCESS,
            payload: result.message
        })
    } else {
        yield put({
            type: User.DELETE_USER_FAILURE,
            payload: result.error
        })
    }
}

export function * watchFetchUsersSaga() {
    yield takeLatest(User.FETCH_ALL_USER, fetchUsersSaga)
}

export function * watchFetchSingleUserSaga() {
    yield takeLatest(User.FETCH_SINGLE_USER, fetchSingleUserSaga)
}

export function * watchCreateUserSaga() {
    yield takeLatest(User.CREATE_USER, createUserSaga)
}

export function * watchUpdateUserSaga() {
    yield takeLatest(User.UPDATE_USER, updateUserSaga)
}

export function * watchDeleteUserSaga() {
    yield takeLatest(User.DELETE_USER, deleteUserSaga)
}

export default [
    watchFetchUsersSaga(),
    watchFetchSingleUserSaga(),
    watchCreateUserSaga(),
    watchUpdateUserSaga(),
    watchDeleteUserSaga()
]