const Entry = require('../models/Entry')
let cl = require('./commandLine')

let addToDB = (data) => {
  data = { cpu: data }
  let entry = { date: Date.now(), data }
  Entry
    .create(entry)
    .then(console.log)
    .catch((err) => console.log(err))
}

module.exports = (ee, config) => {
  cl = cl(ee, config)

  ee.addListener('data', addToDB)

  setInterval(cl.getCpu, config.interval)
  return { addToDB }
}
