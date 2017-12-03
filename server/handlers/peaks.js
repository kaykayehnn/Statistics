const Entry = require('../models/Entry')

module.exports = {
  f: config => (req, res) => {
    let threshold = Number(req.query.threshold) || config.cpuThreshold
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    Entry
      .find({ date: { $gte: yesterday }, 'data.cpu': { $gte: threshold } }, { _id: 0, __v: 0 })
      .sort({ 'data.cpu': -1 })
      .then(data => {
        let obj = { data }
        res.render('peaks', obj)
      })
  }
}
