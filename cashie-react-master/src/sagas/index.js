import { all } from "redux-saga/effects"
import AuthSaga from "./AuthSaga";
import UserSaga from "./UserSaga";
import CategorySaga from "./CategorySaga";
import ProductSaga from "./ProductSaga";
import TransactionSaga from "./TransactionSaga";
import SettingSaga from "./SettingSaga";

export default function* rootSaga() {
    yield all([
        ...AuthSaga,
        ...UserSaga,
        ...CategorySaga,
        ...ProductSaga,
        ...TransactionSaga,
        ...SettingSaga
    ]);
}