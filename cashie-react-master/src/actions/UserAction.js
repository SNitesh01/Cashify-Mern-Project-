const URL = process.env.REACT_APP_API_BASE_URL
const { getParams } = require("../api/Api")

export async function fetchUsers(payload) {
    let query = ''
    if (payload !== undefined) {
        query = '?' + getParams(payload)
    }
    return fetch(URL + 'user' + query)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function fetchSingleUser(id) {
    return fetch(URL + 'user/' + id)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function createUser({ payload }) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return fetch(URL + 'user', options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function updateUser({ payload }) {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return fetch(URL + 'user/' + payload.id, options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function deleteUser({ payload }) {
    const options = {
        method: 'DELETE'
    }
    return fetch(URL + 'user/' + payload.id, options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}