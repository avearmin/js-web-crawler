function sortPages(pages) {
    const sortedPages = Object.fromEntries(
        Object.entries(pages).sort(([,a],[,b]) => a-b)
    )
    return sortedPages
}

function printReport(pages) {
    sortedPages = sortPages(pages)
    for (url in sortedPages) {
        console.log(`Found ${pages[url]} internal links to ${url}`)
    }
}

module.exports = {
    printReport
}