const mongoose = require('mongoose')

let Entry = mongoose.model('Entry', {
  date: { type: Date, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
})

let addEntry = (entry) => {
  return new Entry(entry)
    .save()
}
let getEntries = (startDate) => {
  // handle options
  return Entry
    .find({ 'date': { $gte: startDate } })
}

module.exports = {
  addEntry,
  getEntries
}
