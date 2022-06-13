import { Product } from "../constants/action";

const initialState = {
    all: {
        loading: true,
        products: [],
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
    transaction: {
        loading: true,
    },
}

const ProductReducer = (state = initialState, action) => {
    const result = action.payload
    switch (action.type) {
        case Product.FETCH_ALL_PRODUCT:
            const { pagination } = state.all
            let products = []
            if (pagination && (parseInt(pagination.page) < result.page)) {
                products = state.all.products
            }
            return { ...state, all: { loading: true, products }}
        case Product.FETCH_ALL_PRODUCT_SUCCESS:
            const oldProducts = state.all.products
            return { ...state, all: {
                loading: false,
                products: [...oldProducts, ...result.products],
                pagination: result.pagination
            }}
        case Product.FETCH_ALL_PRODUCT_FAILURE:
            return { ...state, all: { loading: false, error: result.error }}

        case Product.FETCH_TRANSACTION_PRODUCT:
            return { ...state, transaction: { loading: true }}
        case Product.FETCH_TRANSACTION_PRODUCT_SUCCESS:
            return { ...state, transaction: {
                    loading: false,
                    products: result.all,
                    categories: result.categories,
                    pagination: result.pagination
                }}
        case Product.FETCH_TRANSACTION_PRODUCT_FAILURE:
            return { ...state, all: { loading: false, error: result.error }}

        case Product.FETCH_SINGLE_PRODUCT:
            return { ...state, single: { loading: true }, create: { loading: false }, update: { loading: false }}
        case Product.FETCH_SINGLE_PRODUCT_SUCCESS:
            return { ...state, single: { loading: false, product: result }}
        case Product.FETCH_SINGLE_PRODUCT_FAILURE:
            return { ...state, single: { loading: false, error: result.error }}

        case Product.CREATE_PRODUCT:
            return { ...state, create: { loading: true }}
        case Product.CREATE_PRODUCT_SUCCESS:
            return { ...state, create: { loading: false, success: result.message }}
        case Product.CREATE_PRODUCT_FAILURE:
            let createErrors = {}
            result.errors.forEach((item) => {
                createErrors[item.param] = item.msg
            })
            return { ...state, create: { loading: false, error: createErrors }}

        case Product.UPDATE_PRODUCT:
            return { ...state, create: { loading: true }}
        case Product.UPDATE_PRODUCT_SUCCESS:
            return { ...state, create: { loading: false, success: result.message }}
        case Product.UPDATE_PRODUCT_FAILURE:
            let updateErrors = {}
            result.errors.forEach((item) => {
                updateErrors[item.param] = item.msg
            })
            return { ...state, create: { loading: false, error: updateErrors }}

        case Product.DELETE_PRODUCT:
            return { ...state, delete: { loading: true }}
        case Product.DELETE_PRODUCT_SUCCESS:
            return { ...state, delete: { loading: false, success: result }}
        case Product.DELETE_PRODUCT_FAILURE:
            return { ...state, delete: { loading: false, error: result.message }}

        default:
            return state
    }
}

export default ProductReducer