const EntryMethods = require('../modelsCommon/EntryMethods')
const MaxLength = 1000 * 60 * 60 * 24 * 7 // 7 days

module.exports = (req, res) => {
  let start = Number(req.query.startDate)
  let end = Number(req.query.endDate)
  if (typeof start === 'number' && typeof end === 'number' && !isNaN(start) && !isNaN(end) && end - start < MaxLength) {
    EntryMethods.getAllBetween(start, end)
      .then(data => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(data))
      })
  } else {
    res.writeHead(422, 'Unprocessable Entity')
    res.end('Invalid interval provided')
  }
}
