import { Category } from "../constants/action";

const initialState = {
    all: {
        loading: true,
        categories: []
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
    }
}

const CategoryReducer = (state = initialState, action) => {
    const result = action.payload
    switch (action.type) {
        case Category.FETCH_ALL_CATEGORY:
            const { pagination } = state.all
            let categories = []
            if (pagination && result && (parseInt(pagination.page) < result.page)) {
                categories = state.all.categories
            }
            return { ...state, all: { loading: true, categories }}
        case Category.FETCH_ALL_CATEGORY_SUCCESS:
            const oldCategories = state.all.categories
            return { ...state, all: {
                    loading: false,
                    categories: [...oldCategories, ...result.categories],
                    pagination: result.pagination
                }}
        case Category.FETCH_ALL_CATEGORY_FAILURE:
            return { ...state, all: { loading: false, error: result.error }}

        case Category.FETCH_SINGLE_CATEGORY:
            return { ...state, single: { loading: true }, create: { loading: false }, update: { loading: false }}
        case Category.FETCH_SINGLE_CATEGORY_SUCCESS:
            return { ...state, single: { loading: false, category: result }}
        case Category.FETCH_SINGLE_CATEGORY_FAILURE:
            return { ...state, single: { loading: false, error: result.error }}

        case Category.CREATE_CATEGORY:
            return { ...state, create: { loading: true }}
        case Category.CREATE_CATEGORY_SUCCESS:
            return { ...state, create: { loading: false, success: result.message }}
        case Category.CREATE_CATEGORY_FAILURE:
            let createErrors = {}
            result.errors.forEach((item) => {
                createErrors[item.param] = item.msg
            })
            return { ...state, create: { loading: false, error: createErrors }}

        case Category.UPDATE_CATEGORY:
            return { ...state, create: { loading: true }}
        case Category.UPDATE_CATEGORY_SUCCESS:
            return { ...state, create: { loading: false, success: result.message }}
        case Category.UPDATE_CATEGORY_FAILURE:
            let updateErrors = {}
            result.errors.forEach((item) => {
                updateErrors[item.param] = item.msg
            })
            return { ...state, create: { loading: false, error: updateErrors }}

        case Category.DELETE_CATEGORY:
            return { ...state, delete: { loading: true }}
        case Category.DELETE_CATEGORY_SUCCESS:
            return { ...state, delete: { loading: false, success: result }}
        case Category.DELETE_CATEGORY_FAILURE:
            return { ...state, delete: { loading: false, error: result.message }}

        default:
            return state
    }
}

export default CategoryReducer