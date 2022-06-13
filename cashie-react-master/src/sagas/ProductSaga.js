import { takeLatest, put, call } from "redux-saga/effects";
import {
    fetchProducts,
    fetchTransactionProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    deletePermanentProduct
} from "../actions/ProductAction";
import { Product } from "../constants/action";

function* fetchProductsSaga(payload) {
    const result = yield call(fetchProducts, payload)

    if (result.status === 'success') {
        yield put({
            type: Product.FETCH_ALL_PRODUCT_SUCCESS,
            payload: result.data
        })
    } else {
        yield put({
            type: Product.FETCH_ALL_PRODUCT_FAILURE,
            payload: result
        })
    }
}

function* fetchTransactionProductsSaga(payload) {
    const result = yield call(fetchTransactionProducts, payload)

    if (result.status === 'success') {
        yield put({
            type: Product.FETCH_TRANSACTION_PRODUCT_SUCCESS,
            payload: result.data
        })
    } else {
        yield put({
            type: Product.FETCH_TRANSACTION_PRODUCT_FAILURE,
            payload: result
        })
    }
}

function* fetchProductSaga({ payload }) {
    if (payload !== '') {
        const result = yield call(fetchProduct, payload)
        if (result.status === 'success') {
            yield put({
                type: Product.FETCH_SINGLE_PRODUCT_SUCCESS,
                payload: result.data
            })
        } else {
            yield put({
                type: Product.FETCH_SINGLE_PRODUCT_FAILURE,
                payload: result
            })
        }
    }
}

function* createProductSaga(payload) {
    const result = yield call(createProduct, payload)
    if (result.status === 'success') {
        yield put({
            type: Product.CREATE_PRODUCT_SUCCESS,
            payload: result
        })
    } else {
        yield put({
            type: Product.CREATE_PRODUCT_FAILURE,
            payload: result.message
        })
    }
}

function* updateProductSaga(payload) {
    const result = yield call(updateProduct, payload)
    if (result.status === 'success') {
        yield put({
            type: Product.UPDATE_PRODUCT_SUCCESS,
            payload: result
        })
    } else {
        yield put({
            type: Product.UPDATE_PRODUCT_FAILURE,
            payload: result
        })
    }
}

function* deleteProductSaga(payload) {
    const result = yield call(deleteProduct, payload)
    if (result.status === 'success') {
        yield put({
            type: Product.DELETE_PRODUCT_SUCCESS,
            payload: result
        })
    } else {
        yield put({
            type: Product.DELETE_PRODUCT_FAILURE,
            payload: result
        })
    }
}

function* deletePermanentProductSaga(payload) {
    const result = yield call(deletePermanentProduct, payload)
    if (result.status === 'success') {
        yield put({
            type: Product.DELETE_PERMANENT_PRODUCT_SUCCESS,
            payload: result.data
        })
    } else {
        yield put({
            type: Product.DELETE_PERMANENT_PRODUCT_FAILURE,
            payload: result
        })
    }
}

export function* watchFetchProductsSaga() {
    yield takeLatest(Product.FETCH_ALL_PRODUCT, fetchProductsSaga)
}

export function* watchFetchTransactionProductsSaga() {
    yield takeLatest(Product.FETCH_TRANSACTION_PRODUCT, fetchTransactionProductsSaga)
}

export function* watchFetchProductSaga() {
    yield takeLatest(Product.FETCH_SINGLE_PRODUCT, fetchProductSaga)
}

export function* watchCreateProductSaga() {
    yield takeLatest(Product.CREATE_PRODUCT, createProductSaga)
}
export function* watchUpdateProductSaga() {
    yield takeLatest(Product.UPDATE_PRODUCT, updateProductSaga)
}

export function* watchDeleteProductSaga() {
    yield takeLatest(Product.DELETE_PRODUCT, deleteProductSaga)
}

export function* watchDeletePermanentProductSaga() {
    yield takeLatest(Product.DELETE_PERMANENT_PRODUCT, deletePermanentProductSaga)
}

export default [
    watchFetchProductsSaga(),
    watchFetchTransactionProductsSaga(),
    watchFetchProductSaga(),
    watchCreateProductSaga(),
    watchUpdateProductSaga(),
    watchDeleteProductSaga(),
    watchDeletePermanentProductSaga()
]