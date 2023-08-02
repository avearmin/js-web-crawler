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

async function crawlPage(baseURL, currentURL, pages) {
    try {
        const baseURlObj = new URL(baseURL)
        const currentURLObj = new URL(currentURL)
        if (baseURlObj.hostname !== currentURLObj.hostname) {
            return pages
    }
        const normalizedCurrentURL = normalizeURL(currentURL)
        if (normalizedCurrentURL in pages) {
            pages[normalizedCurrentURL]++
            return pages
    }
        if (currentURL === baseURL) {
            pages[normalizedCurrentURL] = 0
        } else {
            pages[normalizedCurrentURL] = 1
        }
    } catch (error) {
        console.log(`Error: Invalid URL '${currentURL}'`)
    }
    
    try {
        const response = await fetch(baseURL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/html'
            }
        })
        if (!response.ok) {
            console.log(`Error: Couldn\'t fetch HTML from ${currentURL}`)
            return pages
        }
        if (response.headers.get('Content-Type').indexOf('text/html') === -1) {
            console.log(`Error: Content-Type from ${currentURL} is not HTML`)
            return pages
        }
        const html = await response.text()
        const links = getURLsFromHTML(html, baseURL)
        for (const link of links) {
            crawlPage(baseURL, link, pages)
        }
    } catch (error) {
        console.log(error)
    }
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}