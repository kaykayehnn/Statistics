const Entry = require('../models/Entry')

let logData = (cl) => {
  cl.getCpu((cpu) => {
    let data = { cpu: Number(cpu) }
    let entry = { date: Date.now(), data }
    Entry
      .addEntry(entry)
      .catch((err) => console.log(err))
  })
}

module.exports = (cl, config) => {
  setInterval(() => logData(cl), config.interval)
}
