import {Transaction} from "../constants/action";

const initialState = {
    all: {
        loading: true,
        transactions: []
    },
    single: {
        loading: true,
    },
    create: {
        loading: false,
    },
    update: {
        loading: false,
    },
    delete: {
        loading: false,
    },
    dashboard: {
        loading: true
    },

}

const TransactionReducer = (state = initialState, action) => {
    const result = action.payload
    switch (action.type) {
        case Transaction.FETCH_ALL_TRANSACTION:
            const { pagination } = state.all
            let transactions = []
            if (pagination && (parseInt(pagination.page) < result.page)) {
                transactions = state.all.transactions
            }
            return { ...state, all: { loading: true, transactions }}
        case Transaction.FETCH_ALL_TRANSACTION_SUCCESS:
            const oldTransactions = state.all.transactions
            return { ...state, all: {
                    loading: false,
                    transactions: [...oldTransactions, ...result.transactions],
                    pagination: result.pagination
                }}
        case Transaction.FETCH_ALL_TRANSACTION_FAILURE:
            return { ...state, all: { loading: false, error: result.error }}

        case Transaction.FETCH_SINGLE_TRANSACTION:
            return { ...state, single: { loading: true }, create: { loading: false }, update: { loading: false }}
        case Transaction.FETCH_SINGLE_TRANSACTION_SUCCESS:
            return { ...state, single: { loading: false, product: result }}
        case Transaction.FETCH_SINGLE_TRANSACTION_FAILURE:
            return { ...state, single: { loading: false, error: result.error }}

        case Transaction.CREATE_TRANSACTION:
            return { ...state, create: { loading: true }}
        case Transaction.CREATE_TRANSACTION_SUCCESS:
            return { ...state, create: { loading: false, success: result.message, data: result.data }}
        case Transaction.CREATE_TRANSACTION_FAILURE:
            let createErrors = {}
            result.errors.forEach((item) => {
                createErrors[item.param] = item.msg
            })
            return { ...state, create: { loading: false, error: createErrors }}

        case Transaction.UPDATE_TRANSACTION:
            return { ...state, create: { loading: true }}
        case Transaction.UPDATE_TRANSACTION_SUCCESS:
            return { ...state, create: { loading: false, success: result.message }}
        case Transaction.UPDATE_TRANSACTION_FAILURE:
            let updateErrors = {}
            result.errors.forEach((item) => {
                updateErrors[item.param] = item.msg
            })
            return { ...state, create: { loading: false, error: updateErrors }}

        case Transaction.DELETE_TRANSACTION:
            return { ...state, delete: { loading: true }}
        case Transaction.DELETE_TRANSACTION_SUCCESS:
            return { ...state, delete: { loading: false, success: result }}
        case Transaction.DELETE_TRANSACTION_FAILURE:
            return { ...state, delete: { loading: false, error: result.message }}

        case Transaction.FETCH_DASHBOARD:
            return { ...state, dashboard: { loading: true }}
        case Transaction.FETCH_DASHBOARD_SUCCESS:
            return { ...state, dashboard: { loading: false, ...result }}
        case Transaction.FETCH_DASHBOARD_FAILURE:
            return { ...state, dashboard: { loading: false, error: result.error }}

        default:
            return state
    }
}

export default TransactionReducer