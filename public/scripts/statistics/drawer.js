define(['lineChart', 'formatter'], function (lineChart, formatter) {
  return function draw (data) {
    const period = getPeriod()
    // const selector = $('#chart')

    return formatter.toDataTable(data, true)
      .then(function (dataTable) {
        $(window).resize(function () {
          drawChart(dataTable)
        })
        return drawChart(dataTable)
      })

    function getPeriod () {
      return document.location.href.split(window.location.host)[1]
    }
    function drawChart (dataTable) {
      var options = {
        chartArea: {
          width: '90%',
          height: '80%'
        },
        title: 'CPU usage during last ' + period
      }

      return lineChart(dataTable, options, $('#chart'))
    }
  }
})
