function getParams(params) {
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return queryString
}

module.exports = {
    getParams
}