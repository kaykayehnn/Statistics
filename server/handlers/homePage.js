const customStatistics = require('../statistics/custom')

module.exports = (req, res) => {
  customStatistics(req.url.slice(1))
    .then((data) => {
      res.data = data
      res.render('statistics', res)
    })
}
