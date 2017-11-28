let dataAggregator = require('../config/dataAggregator')

module.exports = {
  f: (config) => {
    dataAggregator = dataAggregator(config)
    return (req, res) => {
      let data = dataAggregator(req.query.period)
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
