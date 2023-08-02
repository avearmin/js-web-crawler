const { crawlPage } = require('./crawl.js')

async function main() {
    const arguments = process.argv
    if (arguments.length !== 3) {
        console.log('Error: Web Crawler takes 1 argument.')
        return
    }
    console.log(`Crawling: ${arguments[2]}`)
    const html = await crawlPage(arguments[2])
}

main()