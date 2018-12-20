const _PLUGIN_NAME = 'CloudWatch insights colorss'

let loadCount = 1
function tick () {
  console.log(`Loading ${_PLUGIN_NAME}${'.'.repeat(loadCount)}`)
  loadCount++
}

tick()
require('arrive')
tick()
const Convert = require('ansi-to-html')
const convert = new Convert()
tick()

function isHtmlLog (text) {
  text = text.trim()
  return text.startsWith('<') && text.endsWith('>')
}

function colorize () {
  const item = this
  const content = item.innerHTML
  if (isHtmlLog(content)) {
    return
  }
  item.innerHTML = convert.toHtml(content)
}

document.arrive('.query-results', () => {
  console.log(`Loaded ${_PLUGIN_NAME}!`)
  document.getElementsByClassName('query-results').arrive('.query-results-cell > .odd', colorize)
  document.getElementsByClassName('query-results').arrive('.query-results-cell > .even', colorize)
})
