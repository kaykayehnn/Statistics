define(function () {
  google.charts.load('current', { 'packages': ['corechart'] })
  return function (data) {
    for (var i = 0; i < data.length; i++) {
      var current = data[i]
      data[i] = [new Date(current.date), current.cpu || current.data.cpu]
    }
    data.splice(0, 0, ['Time', 'Usage'])

    return new Promise(function (resolve, reject) {
      google.charts.setOnLoadCallback(function () {
        var dataTable = google.visualization.arrayToDataTable(data)
        resolve(dataTable)
      })
    })
  }
})
