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

async function crawlPage(baseURL) {
    try {
        const response = await fetch(baseURL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/html'
            }
        })
        if (!response.ok) {
            console.log('Error: Couldn\'t fetch HTML')
            return
        }
        if (response.headers.get('Content-Type').indexOf('text/html') === -1) {
            console.log('Error: Content-Type is not HTML')
            return
        }
        return await response.text()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}