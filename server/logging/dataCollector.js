const Entry = require('../models/Entry')
let cl = require('./commandLine')

module.exports = (ee, config) => {
  cl = cl(ee, config)

  let addToDB = (data) => {
    data = { cpu: data }
    let entry = { date: Date.now(), data }
    Entry
      .create(entry)
      .then(data => {
        if (config.env !== 'production') console.log(data)
      })
      .catch((err) => console.log(err))
  }

  ee.addListener('data', addToDB)

  setInterval(cl.getCpu, config.interval)
  return { addToDB }
}
