const EntryMethods = require('../modelsCommon/EntryMethods')
const date = require('../common/date')
const Key = 'lastPeak'
const PeaksPath = '/peaks'
const Threshold = 100
const CookieAge = 24 * 3600 * 1000
const TheEpoch = new Date('1970-01-01').getTime()

module.exports = (req, res, next) => {
  if (req.path === PeaksPath) {
    next()// cookies are handled in front end script
  } else {
    let lastPeakTime = req.cookies[Key] || TheEpoch
    if (!req.cookies[Key]) {
      res.cookie(Key, TheEpoch, { maxAge: CookieAge })
    }

    EntryMethods
      .getPeaks(date.yesterday(), Threshold)
      .then(data => {
        let counter = 0
        for (let obj of data) {
          counter += obj.date.getTime() > lastPeakTime
        }
        res.locals.newPeaksCounter = counter
        next()
      })
  }
}
