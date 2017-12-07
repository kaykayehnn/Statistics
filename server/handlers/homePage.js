const customStatistics = require('../statistics/custom')
const EntryPoint = 'scripts/'

module.exports = (req, res) => {
  customStatistics(req.url.slice(1))
    .then((data) => {
      res.data = data
      res.entryPoint = EntryPoint
      res.render('statistics', res)
    })
}
