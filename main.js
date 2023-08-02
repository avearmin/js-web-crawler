const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
    const arguments = process.argv
    if (arguments.length !== 3) {
        console.log('Error: Web Crawler takes 1 argument.')
        return
    }
    console.log(`Crawling: ${arguments[2]}`)
    const pages = {}
    await crawlPage(arguments[2], arguments[2], pages)
    printReport(pages)
}

main()