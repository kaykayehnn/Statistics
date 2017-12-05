function draw (data) {
  var address = document.location.href.split(window.location.host)[1]
  var period = address.slice(1) || 'hour'
  google.charts.load('current', { 'packages': ['corechart'] })
  google.charts.setOnLoadCallback(formatData)

  function formatData () {
    for (var i = 0; i < data.length; i++) {
      data[i] = [new Date(data[i].date), data[i].avg]
    }
    data.splice(0, 0, ['Time', 'Usage'])
    var dataTable = google.visualization.arrayToDataTable(data)

    $(window).resize(function () {
      drawChart(dataTable)
    })
    drawChart(dataTable)
  }

  function drawChart (data) {
    var options = {
      chartArea: {
        width: '90%',
        height: '80%'
      },
      vAxis: {
        maxValue: 200,
        minValue: 0
      },
      title: 'CPU usage during last ' + period,
      trendlines: {
        0: {
          type: 'polynomial',
          tooltip: false,
          degree: 3
        }
      },
      legend: {
        position: 'bottom'
      }
    }

    var chart = new google.visualization.LineChart(document.getElementById('chart'))
    chart.draw(data, options)
  }
}
