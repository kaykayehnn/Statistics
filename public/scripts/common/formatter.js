define(function () {
  return function (data) {
    for (var i = 0; i < data.length; i++) {
      data[i] = [new Date(data[i].date), data[i].data.cpu]
    }
    data.splice(0, 0, ['Time', 'Usage'])
    var dataTable = google.visualization.arrayToDataTable(data)
    return dataTable
  }
})
