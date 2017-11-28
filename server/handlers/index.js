const homePageHandler = require('./homePage')
const dataHandler = require('./data')
const peaksHandler = require('./peaks')
const notFoundHandler = require('./notFound')

module.exports = (config) => {
  let obj = {
    homePage: homePageHandler,
    data: dataHandler,
    peaks: peaksHandler,
    notFound: notFoundHandler
  }
  for (let prop in obj) {
    if (typeof obj[prop] !== 'function') obj[prop] = obj[prop]['f'](config)
    // if property is an object module needs config
  }
  return obj
}
