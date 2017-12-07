const EntryMethods = require('../modelsCommon/EntryMethods')
const date = require('../common/date')
const EntryPoint = 'scripts/peaks/peaksMain.js'

module.exports = {
  f: config => (req, res) => {
    let threshold = Number(req.query.threshold) || config.cpuThreshold
    let startDate = Number(req.query.date) || date.yesterday()
    EntryMethods
      .getPeaks(startDate, threshold)
      .then(data => {
        let obj = { data, entryPoint: EntryPoint }
        res.render('peaks', obj)
      })
  }
}
