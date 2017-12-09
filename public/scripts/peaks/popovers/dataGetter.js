define(['storage', 'requester', 'formatter'], function (storage, requester, formatter) {
  const fiveMin = 1000 * 300
  return function (date) {
    var storageData = storage.get(date.getTime())
    var pr
    if (storageData) {
      pr = Promise.resolve(storageData)
    } else {
      var options = getRequestOptions(date)
      pr = requester(options)
        .then(formatter.formatData)
        .then(save)
    }
    return pr
      .then(formatter.toDataTable)

    function getRequestOptions (date) {
      var startDate = date.getTime() - fiveMin
      var endDate = date.getTime() + fiveMin
      return {
        url: '/api/data',
        data: {
          startDate,
          endDate
        }
      }
    }
    function save (data) {
      storage.set(date, data)
      return data
    }
  }
})
