const Entry = require('../models/Entry')

module.exports = {
  f: config => (req, res) => {
    let threshold = Number(req.query.threshold) || config.cpuThreshold
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    Entry
      .find({ date: { $gte: yesterday }, 'data.cpu': { $gte: threshold } })
      .sort({ 'data.cpu': -1 })
      .then(data => {
        res.render('peaks', data)
      })
  }
}
