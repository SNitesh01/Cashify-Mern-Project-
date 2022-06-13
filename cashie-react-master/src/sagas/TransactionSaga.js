import { takeLatest, put, call } from "redux-saga/effects";
import {
    fetchTransactions,
    fetchTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    deletePermanentTransaction,
    fetchDashboard
} from "../actions/TransactionAction";
import { Transaction } from "../constants/action";

function* fetchTransactionsSaga(payload) {
    const result = yield call(fetchTransactions, payload)
    if (result.status === 'success') {
        yield put({
            type: Transaction.FETCH_ALL_TRANSACTION_SUCCESS,
            payload: result.data
        })
    } else {
        yield put({
            type: Transaction.FETCH_ALL_TRANSACTION_FAILURE,
            payload: result
        })
    }
}

function* fetchDashboardSaga(payload) {
    const result = yield call(fetchDashboard, payload)
     if (result.status === 'success') {
        yield put({
            type: Transaction.FETCH_DASHBOARD_SUCCESS,
            payload: result.data
        })
    } else {
        yield put({
            type: Transaction.FETCH_DASHBOARD_FAILURE,
            payload: result
        })
    }
}

function* fetchTransactionSaga(payload) {
    const result = yield call(fetchTransaction, payload)
    if (result.status === 'success') {
        yield put({
            type: Transaction.FETCH_ALL_TRANSACTION_SUCCESS,
            payload: result.data
        })
    } else {
        yield put({
            type: Transaction.FETCH_ALL_TRANSACTION_FAILURE,
            payload: result
        })
    }
}

function* createTransactionSaga(payload) {
    const result = yield call(createTransaction, payload)
    if (result.status === 'success') {
        yield put({
            type: Transaction.CREATE_TRANSACTION_SUCCESS,
            payload: result
        })
    } else {
        yield put({
            type: Transaction.CREATE_TRANSACTION_FAILURE,
            payload: result
        })
    }
}

function* updateTransactionSaga(payload) {
    const result = yield call(updateTransaction, payload)
    if (result.status === 'success') {
        yield put({
            type: Transaction.UPDATE_TRANSACTION_SUCCESS,
            payload: result
        })
    } else {
        yield put({
            type: Transaction.UPDATE_TRANSACTION_FAILURE,
            payload: result
        })
    }
}

function* deleteTransactionSaga(payload) {
    const result = yield call(deleteTransaction, payload)
    console.log(result)
    if (result.status === 'success') {
        yield put({
            type: Transaction.DELETE_PERMANENT_TRANSACTION_SUCCESS,
            payload: result
        })
    } else {
        yield put({
            type: Transaction.DELETE_PERMANENT_TRANSACTION_FAILURE,
            payload: result
        })
    }
}

function* deletePermanentTransactionSaga(payload) {
    const result = yield call(deletePermanentTransaction, payload)
    if (result.status === 'success') {
        yield put({
            type: Transaction.DELETE_PERMANENT_TRANSACTION_SUCCESS,
            payload: result.data
        })
    } else {
        yield put({
            type: Transaction.DELETE_PERMANENT_TRANSACTION_FAILURE,
            payload: result
        })
    }
}

export function* watchFetchTransactionsSaga() {
    yield takeLatest(Transaction.FETCH_ALL_TRANSACTION, fetchTransactionsSaga)
}

export function* watchFetchDashboardSaga() {
    yield takeLatest(Transaction.FETCH_DASHBOARD, fetchDashboardSaga)
}

export function* watchFetchTransactionSaga() {
    yield takeLatest(Transaction.FETCH_SINGLE_TRANSACTION, fetchTransactionSaga)
}

export function* watchCreateTransactionSaga() {
    yield takeLatest(Transaction.CREATE_TRANSACTION, createTransactionSaga)
}
export function* watchUpdateTransactionSaga() {
    yield takeLatest(Transaction.UPDATE_TRANSACTION, updateTransactionSaga)
}

export function* watchDeleteTransactionSaga() {
    yield takeLatest(Transaction.DELETE_TRANSACTION, deleteTransactionSaga)
}

export function* watchDeletePermanentTransactionSaga() {
    yield takeLatest(Transaction.DELETE_PERMANENT_TRANSACTION, deletePermanentTransactionSaga)
}

export default [
    watchFetchTransactionsSaga(),
    watchFetchTransactionSaga(),
    watchCreateTransactionSaga(),
    watchUpdateTransactionSaga(),
    watchDeleteTransactionSaga(),
    watchDeletePermanentTransactionSaga(),
    watchFetchDashboardSaga()
]