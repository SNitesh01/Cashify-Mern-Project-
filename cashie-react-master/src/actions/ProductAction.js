const URL = process.env.REACT_APP_API_BASE_URL
const { getParams } = require("../api/Api")

export async function fetchProducts({payload}) {
    let query = ''
    if (payload !== undefined) {
        query = '?' + getParams(payload)
    }
    return fetch(URL + 'product' + query)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function fetchTransactionProducts({payload}) {
    let query = ''
    if (payload !== undefined) {
        query = '?' + getParams(payload)
    }
    return fetch(URL + 'product/transaction' + query)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function fetchProduct(payload) {
    return fetch(URL + 'product/' + payload)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function createProduct({ payload }) {
    const formData  = new FormData();

    Object.keys(payload).map(key => {
        return formData.append(key, payload[key])
    })

    const options = {
        method: 'POST',
        body: formData
    }

    return fetch(URL + 'product', options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function updateProduct({ payload }) {
    const formData  = new FormData();

    Object.keys(payload).map(key => {
        return formData.append(key, payload[key])
    })

    const options = {
        method: 'PUT',
        body: formData
    }

    return fetch(URL + 'product/' + payload.id, options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function deleteProduct({ payload }) {
    const options = {
        method: 'DELETE'
    }
    return fetch(URL + 'product/' + payload.id, options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function deletePermanentProduct({ payload }) {
    const options = {
        method: 'DELETE'
    }
    return fetch(URL + 'product/delete-permanent/' + payload.id, options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}