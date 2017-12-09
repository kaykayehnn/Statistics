define(function () {
  const DefaultOptions = JSON.stringify({
    chartArea: {
      width: '80%',
      height: '80%'
    },
    vAxis: {
      maxValue: 200,
      minValue: 0
    },
    title: 'CPU usage',
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
  })

  google.charts.load('current', { 'packages': ['corechart'] })

  return function drawChart (dataTable, customOptions, selector) {
    // returns not attached div with chart
    var options = getOptions(customOptions)
    var div = selector || $('<div class="container-fluid">')
    var chart = new google.visualization.LineChart(div[0])

    chart.draw(dataTable, options)
    return div
  }

  function getOptions (customOptions) {
    var options = JSON.parse(DefaultOptions)
    for (var key of Object.keys(customOptions)) {
      options[key] = customOptions[key]
    }
    return options
  }
})
