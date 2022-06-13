import {Login} from "../constants/action";

const initialState = {
    loading: false,
    token: '',
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case Login.LOGIN: {
            return {
                ...state,
                loading: true,
                success: undefined,
                error: undefined
            }
        }
        case Login.LOGIN_SUCCESS: {
            localStorage.setItem('user', JSON.stringify(action.payload))
            return {
                ...state,
                loading: false,
                success: action.payload.message,
                token: action.payload.token
            }
        }
        case Login.LOGIN_FAILURE: {
            const message = action.payload ? action.payload : 'Something wrong. Try again!'
            return {
                ...state,
                loading: false,
                error: message
            }
        }
        default:
            return state
    }
}

export default AuthReducer