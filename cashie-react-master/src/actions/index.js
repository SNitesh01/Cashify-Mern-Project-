import { Login, User, Category, Product, Transaction, Setting } from "../constants/action";

export const login = (data) => ({ type: Login.LOGIN, payload: data })

export const fetchUsers = (data) => ({ type: User.FETCH_ALL_USER, payload: data })
export const fetchSingleUser = (data) => ({ type: User.FETCH_SINGLE_USER, payload: data })
export const createUser = (data) => ({ type: User.CREATE_USER, payload: data })
export const updateUser = (data) => ({ type: User.UPDATE_USER, payload: data })
export const deleteUser = (data) => ({ type: User.DELETE_USER, payload: data })

export const fetchCategories = (data) => ({ type: Category.FETCH_ALL_CATEGORY, payload: data })
export const fetchSingleCategory = (data) => ({ type: Category.FETCH_SINGLE_CATEGORY, payload: data })
export const createCategory = (data) => ({ type: Category.CREATE_CATEGORY, payload: data })
export const updateCategory = (data) => ({ type: Category.UPDATE_CATEGORY, payload: data })
export const deleteCategory = (data) => ({ type: Category.DELETE_CATEGORY, payload: data })

export const fetchProducts = (data) => ({ type: Product.FETCH_ALL_PRODUCT, payload: data })
export const fetchTransactionProducts = (data) => ({ type: Product.FETCH_TRANSACTION_PRODUCT, payload: data })
export const fetchSingleProduct = (data) => ({ type: Product.FETCH_SINGLE_PRODUCT, payload: data })
export const createProduct = (data) => ({ type: Product.CREATE_PRODUCT, payload: data })
export const updateProduct = (data) => ({ type: Product.UPDATE_PRODUCT, payload: data })
export const deleteProduct = (data) => ({ type: Product.DELETE_PRODUCT, payload: data })
export const deletePermanentProduct = (data) => ({ type: Product.DELETE_PERMANENT_PRODUCT, payload: data })

export const fetchTransactions = (data) => ({ type: Transaction.FETCH_ALL_TRANSACTION, payload: data })
export const fetchSingleTransaction = (data) => ({ type: Transaction.FETCH_SINGLE_TRANSACTION, payload: data })
export const createTransaction = (data) => ({ type: Transaction.CREATE_TRANSACTION, payload: data })
export const updateTransaction = (data) => ({ type: Transaction.UPDATE_TRANSACTION, payload: data })
export const deleteTransaction = (data) => ({ type: Transaction.DELETE_TRANSACTION, payload: data })
export const deletePermanentTransaction = (data) => ({ type: Transaction.DELETE_PERMANENT_TRANSACTION, payload: data })
export const fetchDashboard = (data) => ({ type: Transaction.FETCH_DASHBOARD, payload: data })

export const fetchSetting = (data) => ({ type: Setting.FETCH_SETTING, payload: data })
export const updateSetting = (data) => ({ type: Setting.UPDATE_SETTING, payload: data })