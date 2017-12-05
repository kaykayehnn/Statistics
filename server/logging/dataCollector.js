const addToDB = require('../modelsCommon/EntryMethods').addToDB
let cl = require('./commandLine')

module.exports = (ee, config) => {
  cl = cl(ee, config)

  ee.addListener('data', addToDB)

  setInterval(cl.getCpu, config.interval)
  return { addToDB }
}
