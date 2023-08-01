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

function getAbsoluteURLFromElement(element, baseURL) {
    let url = element.getAttribute('href')
    if (url.charAt(0) === '/' || url.charAt(0) === '.') {
        let startIndex = 0
        if (url.charAt(0) === '.') {
            startIndex = 1
        }
        url = baseURL + url.substring(startIndex, url.length)
    }
    return url
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const elements = Array.from(dom.window.document.querySelectorAll('a'))
    const URLs = elements.map(element => getAbsoluteURLFromElement(element, baseURL))
    return URLs
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}