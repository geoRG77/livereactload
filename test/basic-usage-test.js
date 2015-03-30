
let expect    = require('chai').expect,
    webdriver = require('webdriverio'),
    testCase  = require('./util/livereactload-test-case')


testCase('Basic usage', '01-basic-usage', (helpers, done) => {
  helpers.rebundle()

  var options = { desiredCapabilities: { browserName: 'firefox' } }
  webdriver
    .remote(options)
    .init()
    .url('http://localhost:3000')
    .setValue('input', 'lolbal')
    .click('button')
    .pause(100)
    .execute(expectHtmlFrom, 'ul', toContainsText('item : lolbal'))
    .call(() => helpers.replace('list.js', 'item :', 'item -'))
    .call(helpers.rebundle)
    .call(helpers.notify)
    .pause(2000)
    .execute(expectHtmlFrom, 'ul', toContainsText('item - lolbal'))
    .end(done)
})


function expectHtmlFrom(selector) {
  var elems = document.querySelectorAll(selector)
  var html = '' + elems.length
  for (var i = 0 ; i < elems.length ; i++) {
    html += elems[i].textContent
  }
  return html
}

function toContainsText(text) {
  return (err, html) => {
    if (!html) throw new Error('text "' + text + '" was not found')
    if (html.value.indexOf(text) === -1) throw new Error('text "' + text + '" not found from html: ' + html.value)
  }
}

function wait(ms) {

}
