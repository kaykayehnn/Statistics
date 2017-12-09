const Entry = require('../models/Entry')

const offsets = {
  hour: 3600 * 1000,
  day: 24 * 3600 * 1000,
  week: 7 * 24 * 3600 * 1000
}
const millisPerPoint = {
  hour: 6E4,
  day: 1.44E6,
  week: 1.008E7
}
const TheEpoch = new Date('1970-01-01')

let simpleQuery = (startDate, millis) => {
  return Entry.aggregate([{
    $match: {
      date: {
        $gte: startDate
      }
    }
  },
  {
    $group: {
      _id: {
        $floor: {
          $divide: [{
            $subtract: ['$date', startDate]
          }, millis]
        }
      },
      cpu: {
        $avg: '$data.cpu'
      },
      date: {
        $avg: {
          $sum: {
            $subtract: ['$date', TheEpoch]
          }
        }
      }
    }
  },
  {
    $project: {
      _id: 0
    }
  },
  {
    $sort: {
      date: 1
    }
  }
  ])
}

module.exports = (period) => {
  let startDate = new Date()
  let offset = offsets[period]
  let millis = millisPerPoint[period]
  startDate.setTime(startDate.getTime() - offset)

  let toReturn = millis
    ? simpleQuery(startDate, millis)
    : 'Invalid period'

  return Promise.resolve(toReturn)
}
