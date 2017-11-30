$(document).ready(function () {
  var period;
  google.charts.load('current', { 'packages': ['corechart'] })
  google.charts.setOnLoadCallback(getData)

  function getData () {
    var address = document.location.href.split(window.location.host)[1]
    period = address.slice(1) || 'hour'
    $.ajax({
      url: 'data' + '?period=' + period
    }).then(formatData)
      .then(drawChart)
  }

  function formatData (data) {
    for (var i = 0; i < data.length; i++) {
      data[i] = [new Date(data[i].date), data[i].avg]
    }
    data.splice(0, 0, ['Time', 'Usage'])
    $(window).resize(function () {
      drawChart(data)
    })
    return data
  }

  function drawChart (data) {
    data = google.visualization.arrayToDataTable(data)
    var options = {
      chartArea: {
        width: '90%',
        height: '80%'
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
})