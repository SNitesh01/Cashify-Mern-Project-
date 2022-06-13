import { takeLatest, put, call } from "redux-saga/effects";
import { fetchCategories, fetchCategory, createCategory, updateCategory, deleteCategory } from "../actions/CategoryAction";
import { Category } from "../constants/action";

function* fetchCategoriesSaga(payload) {
    const result = yield call(fetchCategories, payload)
    if (result.status === 'success') {
        yield put({
            type: Category.FETCH_ALL_CATEGORY_SUCCESS,
            payload: result.data
        })
    } else {
        yield put({
            type: Category.FETCH_ALL_CATEGORY_FAILURE,
            payload: result
        })
    }
}

function* fetchCategorySaga(payload) {
    const result = yield call(fetchCategory, payload)
    if (result.status === 'success') {
        yield put({
            type: Category.FETCH_SINGLE_CATEGORY_SUCCESS,
            payload: result.data
        })
    } else {
        yield put({
            type: Category.FETCH_SINGLE_CATEGORY_FAILURE,
            payload: result
        })
    }
}

function* createCategorySaga(payload) {
    const result = yield call(createCategory, payload)
    if (result.status === 'success') {
        yield put({
            type: Category.CREATE_CATEGORY_SUCCESS,
            payload: result
        })
    } else {
        yield put({
            type: Category.CREATE_CATEGORY_FAILURE,
            payload: result
        })
    }
}

function* updateCategorySaga(payload) {
    const result = yield call(updateCategory, payload)
    if (result.status === 'success') {
        yield put({
            type: Category.UPDATE_CATEGORY_SUCCESS,
            payload: result
        })
    } else {
        yield put({
            type: Category.UPDATE_CATEGORY_FAILURE,
            payload: result
        })
    }
}

function* deleteCategorySaga(payload) {
    const result = yield call(deleteCategory, payload)
    if (result.status === 'success') {
        yield put({
            type: Category.DELETE_CATEGORY_SUCCESS,
            payload: result
        })
    } else {
        yield put({
            type: Category.DELETE_CATEGORY_FAILURE,
            payload: result
        })
    }
}
export function* watchFetchCategoriesSaga() {
    yield takeLatest(Category.FETCH_ALL_CATEGORY, fetchCategoriesSaga)
}

export function* watchFetchCategorySaga() {
    yield takeLatest(Category.FETCH_SINGLE_CATEGORY, fetchCategorySaga)
}

export function* watchCreateCategorySaga() {
    yield takeLatest(Category.CREATE_CATEGORY, createCategorySaga)
}
export function* watchUpdateCategorySaga() {
    yield takeLatest(Category.UPDATE_CATEGORY, updateCategorySaga)
}

export function* watchDeleteCategorySaga() {
    yield takeLatest(Category.DELETE_CATEGORY, deleteCategorySaga)
}
export default [
    watchFetchCategoriesSaga(),
    watchFetchCategorySaga(),
    watchCreateCategorySaga(),
    watchUpdateCategorySaga(),
    watchDeleteCategorySaga()
]