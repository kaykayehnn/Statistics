let customStatistics = require('../statistics/custom')

module.exports = {
  f: (config) => {
    customStatistics = customStatistics(config)
    return (req, res) => {
      let data = customStatistics(req.query.period)
      res.writeHead(200, {
        'content-type': 'application/json'
      })
      data.then((data) => {
        if (Array.isArray(data)) {
          data = JSON.stringify(data)
        }
        res.end(data)
      })
    }
  }
}
