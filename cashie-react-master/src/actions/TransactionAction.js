const URL = process.env.REACT_APP_API_BASE_URL
const { getParams } = require("../api/Api")

export async function fetchTransactions({payload}) {
    let query = ''
    if (payload !== undefined) {
        query = '?' + getParams(payload)
    }

    return fetch(URL + 'transaction' + query)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function fetchTransaction({ payload }) {
    return fetch(URL + 'transaction/' + payload.id)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function createTransaction({ payload }) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return fetch(URL + 'transaction', options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function updateTransaction({ payload }) {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return fetch(URL + 'transaction/' + payload.id, options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function deleteTransaction({ payload }) {
    const options = {
        method: 'DELETE'
    }
    return fetch(URL + 'transaction/' + payload.id, options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function deletePermanentTransaction({ payload }) {
    const options = {
        method: 'DELETE'
    }
    return fetch(URL + 'transaction/delete-permanent/' + payload.id, options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function fetchDashboard({payload}) {
    let query = ''
    if (payload !== undefined) {
        query = '?' + getParams(payload)
    }

    return fetch(URL + 'transaction/dashboard' + query)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}
