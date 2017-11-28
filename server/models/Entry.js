const mongoose = require('mongoose')

let Entry = mongoose.model('Entry', {
  date: { type: Date, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
})

module.exports = Entry
