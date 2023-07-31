const { JSDOM } = require('jsdom')

function removeAllTrailingSlashes(str) {
    if (str.length === 1) { // Handles the case where the str is a single trailing slash
        return str
    }
    for (let i = str.length - 1; i >= 0; i--) {
        if (!(str[i] === '/')) {
            return str.substring(0, i + 1)
        }
    }
}

function normalizeURL(url) {
    const urlObj = new URL(url)
    let normalizedURL = ''
    if (urlObj.host) {
        normalizedURL += urlObj.host
    }
    if (urlObj.pathname) {
        normalizedPathname = removeAllTrailingSlashes(urlObj.pathname)
        normalizedURL += normalizedPathname
    }
    return normalizedURL
}

function getURLsFromHTML(htmlBody, baseURL) {

}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}