const URL = process.env.REACT_APP_API_BASE_URL
const { getParams } = require("../api/Api")

export async function fetchCategories({payload}) {
    let query = ''
    if (payload !== undefined) {
        query = '?' + getParams(payload)
    }

    return fetch(URL + 'category' + query)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function fetchCategory({ payload }) {
    return fetch(URL + 'category/' + payload)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function createCategory({ payload }) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return fetch(URL + 'category', options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function updateCategory({ payload }) {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return fetch(URL + 'category/' + payload.id, options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function deleteCategory({ payload }) {
    const options = {
        method: 'DELETE'
    }
    return fetch(URL + 'category/' + payload.id, options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}