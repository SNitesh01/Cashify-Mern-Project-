import {User} from "../constants/action";

const initialState = {
    all: {
        loading: true,
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

const UserReducer = (state = initialState, action) => {
    const result = action.payload
    switch (action.type) {
        case User.FETCH_ALL_USER:
            const { pagination } = state.all
            let users = []
            if (pagination && (parseInt(pagination.page) < result.page)) {
                users = state.all.users
            }
            return { ...state, all: { loading: true, users }}
        case User.FETCH_ALL_USER_SUCCESS:
            const oldUsers = state.all.users
            return { ...state, all: {
                loading: false,
                    users: [...oldUsers, ...result.users],
                    pagination: result.pagination
            }}
        case User.FETCH_ALL_USER_FAILURE:
            return { ...state, all: { loading: false, error: result.error }}

        case User.FETCH_SINGLE_USER:
            return { ...state, single: { loading: true }, create: { loading: false }, update: { loading: false }}
        case User.FETCH_SINGLE_USER_SUCCESS:
            return { ...state, single: { loading: false, user: result }}
        case User.FETCH_SINGLE_USER_FAILURE:
            return { ...state, single: { loading: false, user: {}, error: result }}

        case User.CREATE_USER:
            return { ...state, create: { loading: true }}
        case User.CREATE_USER_SUCCESS:
            return { ...state, create: { loading: false, success: result.message }}
        case User.CREATE_USER_FAILURE:
            let createErrors = {}
            result.errors.forEach((item) => {
                createErrors[item.param] = item.msg
            })
            return { ...state, create: { loading: false, error: createErrors }}

        case User.UPDATE_USER:
            return { ...state, update: { loading: true }}
        case User.UPDATE_USER_SUCCESS:
            return { ...state, update: { loading: false, success: result }}
        case User.UPDATE_USER_FAILURE:
            let updateErrors = {}
            result.errors.forEach((item) => {
                updateErrors[item.param] = item.msg
            })
            return { ...state, update: { loading: false, error: updateErrors }}

        case User.DELETE_USER:
            return { ...state, delete: { loading: true }}
        case User.DELETE_USER_SUCCESS:
            return { ...state, delete: { loading: false, success: result }}
        case User.DELETE_USER_FAILURE:
            return { ...state, delete: { loading: false, error: result.message }}
        default:
            return state
    }
}

export default UserReducer