const URL = process.env.REACT_APP_API_BASE_URL

export async function login({ payload }) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://cashie.herokuapp.com/login' },
        body: JSON.stringify(payload)
    }

    return fetch(URL + 'auth/login', options)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            return {
                error: error.message
            }
        })
}