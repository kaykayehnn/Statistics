const Entry = require('../models/Entry')
const offsets = {
  hour: 3600 * 1000,
  day: 3600 * 1000 * 24,
  week: 3600 * 1000 * 24 * 7
}
let averageTime = (t1, t2) => (t1.getTime() + t2.getTime()) / 2

let roundAndAverage = (arr, divisor, lastDivisor) => {
  let len = arr.length
  let last = len - 1
  for (let i = 0; i < last; i++) {
    arr[i].avg = Math.round(arr[i].total / divisor * 10) / 10
    delete arr[i].total
  }
  arr[last].avg = Math.round(arr[last].total / lastDivisor * 10) / 10
  delete arr[last].total
}

let averageToPoints = (data, points) => {
  let len = data.length
  if (len < points) return 'Not enough points'

  let sums = new Array(points)
  let pointsPerPoint = Math.floor(len / points)
  let lastExtra = len % pointsPerPoint
  for (let i = 0; i < points; i++) {
    sums[i] = { date: data[i * pointsPerPoint].date, total: 0 }
    for (let j = 0; j < pointsPerPoint; j++) {
      sums[i].total += data[i * pointsPerPoint + j].data.cpu
    }
    if (i !== points - 1) {
      sums[i].date.setTime(
        averageTime(sums[i].date, data[(i + 1) * pointsPerPoint - 1].date))
    }
  }

  let lastData = len - 1
  let lastPoint = points - 1
  for (let i = 0; i < lastExtra; i++) {
    sums[lastPoint].total += data[lastData - i].data.cpu
  }

  sums[lastPoint].date.setTime(averageTime(sums[lastPoint].date, data[lastData].date))
  roundAndAverage(sums, pointsPerPoint, pointsPerPoint + lastExtra)
  return sums
}

module.exports = (config) => (period) => {
  let startDate = new Date()
  let offset = offsets[period]
  if (!offset) {
    return
    // invalid
  }
  startDate.setTime(startDate.getTime() - offset)
  return Entry
    .getEntries(startDate)
    .then(data => averageToPoints(data, config.pointsPerGraphic))
}
