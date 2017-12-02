let emptyArr = (size) => {
  return Array.apply(null, Array(size)).map(a => 0)
}

module.exports = (ee, config) => {
  let ppg = config.pointsPerGraphic
  const epsilon = 1E-10
  const intervals = {
    hour: 3600 * 1000 / ppg / config.interval,
    day: 24 * 3600 * 1000 / ppg / config.interval,
    week: 7 * 24 * 3600 * 1000 / ppg / config.interval
  }
  const arrs = {
    hour: emptyArr(ppg),
    day: emptyArr(ppg),
    week: emptyArr(ppg)
  }
  const counters = {
    hour: 0,
    day: 0,
    week: 0
  }

  ee.addListener('data', aggregate)

  function aggregate (data) {
    for (let prop in arrs) {
      let counter = counters[prop]++
      let arr = arrs[prop]
      let interval = intervals[prop]
      let index = Math.floor(counter / interval) % ppg
      let shouldSetZero = Math.abs(counter % interval) < epsilon && (counter / interval / ppg) >= 1
      if (shouldSetZero) { // !index means index is 0
        arr[index] = 0
      }
      arr[index] += data
    }
  }
}
