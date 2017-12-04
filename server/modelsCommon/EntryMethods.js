const Entry = require('../models/Entry')

let getPeaks = (date, threshold) => Entry
  .find({ date: { $gte: date }, 'data.cpu': { $gte: threshold } }, { _id: 0, __v: 0 })
  .sort({ date: -1 })

module.exports = {
  getPeaks
}
