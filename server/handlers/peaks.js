const EntryMethods = require('../modelsCommon/EntryMethods')
const date = require('../common/date')

module.exports = {
  f: config => (req, res) => {
    let threshold = Number(req.query.threshold) || config.cpuThreshold
    let startDate = Number(req.query.date) || date.yesterday()
    EntryMethods
      .getPeaks(startDate, threshold)
      .then(data => {
        let obj = { data }
        res.render('peaks', obj)
      })
  }
}
