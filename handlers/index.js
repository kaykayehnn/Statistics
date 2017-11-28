const homePageHandler = require('./homePage')
const dataHandler = require('./data')

module.exports = (config) => {
  let obj = {
    homePage: homePageHandler,
    data: dataHandler
  }
  for (let prop in obj) {
    obj[prop] = obj[prop](config)
  }
  return obj
}
