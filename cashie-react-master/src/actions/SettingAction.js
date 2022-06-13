const URL = process.env.REACT_APP_API_BASE_URL

export async function fetchSetting() {
    return fetch(URL + 'setting')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}

export async function updateSetting({ payload }) {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return fetch(URL + 'setting/' + payload.id, options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}