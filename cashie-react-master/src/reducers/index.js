import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from 'redux-form';
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import CategoryReducer from "./CategoryReducer";
import ProductReducer from "./ProductReducer";
import TransactionReducer from "./TransactionReducer";
import SettingReducer from "./SettingReducer";

const rootReducres = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    category: CategoryReducer,
    product: ProductReducer,
    transaction: TransactionReducer,
    setting: SettingReducer,
    form: reduxFormReducer,
})

export default rootReducres