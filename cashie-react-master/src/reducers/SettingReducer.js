import {Setting} from "../constants/action";

const initialState = {
    single: {
        loading: true
    },
    update: {
        loading: false
    }
}

const SettingReducer = (state = initialState, action) => {
    const result = action.payload
    switch (action.type) {
        case Setting.FETCH_SETTING:
            return { ...state, single: { loading: true }, update: { loading: false }}
        case Setting.FETCH_SETTING_SUCCESS:
            return { ...state, single: { loading: false, setting: result }}
        case Setting.FETCH_SETTING_FAILURE:
            return { ...state, single: { loading: false, error: result }}

        case Setting.UPDATE_SETTING:
            return { ...state, update: { loading: true }}
        case Setting.UPDATE_SETTING_SUCCESS:
            return { ...state, update: { loading: false, success: result }}
        case Setting.UPDATE_SETTING_FAILURE:
            let updateErrors = {}
            result.errors.forEach((item) => {
                updateErrors[item.param] = item.msg
            })
            return { ...state, update: { loading: false, error: updateErrors }}

        default:
            return state
    }
}

export default SettingReducer