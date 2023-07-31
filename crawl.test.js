const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('normalize http://GooGle.COM', () => {
    expect(normalizeURL('http://GooGle.COM')).toBe('google.com')
})

test('normalize https://gooGle.COM', () => {
    expect(normalizeURL('http://gooGle.COM')).toBe('google.com')
})

test('normalize https://GOOGLE.COM', () => {
    expect(normalizeURL('https://GOOGLE.COM')).toBe('google.com')
})