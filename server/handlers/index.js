const homePageHandler = require('./homePage')
const peaksHandler = require('./peaks')
const notFoundHandler = require('./notFound')

module.exports = (config) => {
  let obj = {
    homePage: homePageHandler,
    peaks: peaksHandler,
    notFound: notFoundHandler
  }
  for (let prop in obj) {
    if (typeof obj[prop] !== 'function') obj[prop] = obj[prop]['f'](config)
    // if property is an object module needs config
  }
  return obj
}
