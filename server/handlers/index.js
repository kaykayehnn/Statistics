const homePageHandler = require('./homePage')
const dataHandler = require('./data')
const notFoundHandler = require('./notFound')

module.exports = (config) => {
  let obj = {
    homePage: homePageHandler,
    data: dataHandler,
    notFound: notFoundHandler
  }
  for (let prop in obj) {
    obj[prop] = obj[prop](config)
  }
  return obj
}
