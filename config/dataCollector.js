const Entry = require('../models/Entry')
let cl = require('./commandLine')

let addToDB = (data) => {
  data = { cpu: Number(data) }
  let entry = { date: Date.now(), data }
  Entry
    .addEntry(entry)
    .then(console.log)
    .catch((err) => console.log(err))
}

module.exports = (config, ee) => {
  cl = cl(config, ee)

  ee.addListener('data', addToDB)

  setInterval(cl.getCpu, config.interval)
  return { addToDB }
}
