const Entry = require('../models/Entry')

let addToDB = (data) => {
  data = { cpu: data }
  let entry = { date: Date.now(), data }
  Entry
    .create(entry)
    .catch((err) => console.log(err))
}
let getAllBetween = (start, end) => {
  return Entry.find({ date: { $gte: start, $lte: end } })
}
let getPeaks = (date, threshold) => {
  return Entry
    .find({ date: { $gte: date }, 'data.cpu': { $gte: threshold } }, { _id: 0, __v: 0 })
    .sort({ date: -1 })
}

module.exports = {
  addToDB,
  getAllBetween,
  getPeaks
}
