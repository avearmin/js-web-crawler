const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')

test('normalize http://GooGle.COM', () => {
    expect(normalizeURL('http://GooGle.COM')).toBe('google.com/')
})

test('normalize https://gooGle.COM', () => {
    expect(normalizeURL('http://gooGle.COM')).toBe('google.com/')
})

test('normalize https://GOOGLE.COM', () => {
    expect(normalizeURL('https://GOOGLE.COM')).toBe('google.com/')
})

test('normalize https://SomeWebSite.com/some/path', () => {
    expect(normalizeURL('https://SomeWebSite.com/some/path')).toBe('somewebsite.com/some/path')
})

test('normalize https://SomeWebSite.com/some/path/', () => {
    expect(normalizeURL('https://SomeWebSite.com/some/path/')).toBe('somewebsite.com/some/path')
})

test('normalize https://SomeWebSite.com/some/path///////////', () => {
    expect(normalizeURL('https://SomeWebSite.com/some/path///////////')).toBe('somewebsite.com/some/path')
})

const testHTML1 = `
    <ul> 
    <li><a href="./recipes/kwama-egg-quiche.html">Kwama Egg Quiche</a></li>
    <li><a href="./recipes/wickwheat-toast.html">Wickwheat Toast</a></li>
    <li><a href="./recipes/the-hound-and-rat.html">The Hound and Rat</a></li>
    </ul>
`

const testHTML2 = `
    <ul> 
    <li><a href="https://testsite2.com/recipes/kwama-egg-quiche.html">Kwama Egg Quiche</a></li>
    <li><a href="https://testsite2.com/recipes/wickwheat-toast.html">Wickwheat Toast</a></li>
    <li><a href="https://testsite2.com/recipes/the-hound-and-rat.html">The Hound and Rat</a></li>
    </ul>
`

const testHTML3 = `
    <ul> 
    <li><a href="https://testsite3.com/recipes/kwama-egg-quiche.html">Kwama Egg Quiche</a></li>
    <li><a href="/recipes/wickwheat-toast.html">Wickwheat Toast</a></li>
    <li><a href="/recipes/the-hound-and-rat.html">The Hound and Rat</a></li>
    </ul>
`

test('found all links at https://testsite1.com', () => {
    expect(getURLsFromHTML(testHTML1, 'https://testsite1.com')).toStrictEqual([
        'https://testsite1.com/recipes/kwama-egg-quiche.html',
        'https://testsite1.com/recipes/wickwheat-toast.html',
        'https://testsite1.com/recipes/the-hound-and-rat.html'
    ])
})

test('found all links at https://testsite2.com', () => {
    expect(getURLsFromHTML(testHTML2, 'https://testsite2.com')).toStrictEqual([
        'https://testsite2.com/recipes/kwama-egg-quiche.html',
        'https://testsite2.com/recipes/wickwheat-toast.html',
        'https://testsite2.com/recipes/the-hound-and-rat.html'
    ])
})

test('found all links at https://testsite3.com', () => {
    expect(getURLsFromHTML(testHTML3, 'https://testsite3.com')).toStrictEqual([
        'https://testsite3.com/recipes/kwama-egg-quiche.html',
        'https://testsite3.com/recipes/wickwheat-toast.html',
        'https://testsite3.com/recipes/the-hound-and-rat.html'
    ])
})