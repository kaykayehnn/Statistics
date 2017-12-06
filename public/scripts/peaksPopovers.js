const fiveMin = 1000 * 300
const rgx = /^(?:.+?\s){7}/
const tableBtns = $('tbody tr button')

google.charts.load('current', { 'packages': ['corechart'] })
attachPopovers()
tableBtns.click(function (e) {
  setClasses(e.target)
  var target = $(e.target)
  var parent = target.parent()
  var targetDate = new Date(formatDate(parent.text()))
  // requestData(targetDate)
})
function attachPopovers () {
  $(document.body).popover({ title: 'hello', content: 'its me', selector: '.btn', html: true })
}
function setClasses (btn) {
  if (btn) { // not right
    disableAllOtherButtons(btn)
  }
}
function disableAllOtherButtons (btn) {
  for (var i = 0; i < tableBtns.length; i++) {
    var currentBtn = tableBtns[i]
    if (currentBtn !== btn) {
      $(currentBtn).addClass('disabled')
    }
  }
}
function formatDate (text) {
  var match = rgx.exec(text)
  return match[0]
}
function requestData (date) {
  var startDate = date.getTime() - fiveMin
  var endDate = date.getTime() + fiveMin
  var data = { startDate, endDate }
  $.ajax({
    url: '/data',
    data,
    success: formatData,
    error: handleErr
  })
}
function formatData (data) {
  for (var i = 0; i < data.length; i++) {
    data[i] = [new Date(data[i].date), data[i].data.cpu]
  }
  data.splice(0, 0, ['Time', 'Usage'])
  var dataTable = google.visualization.arrayToDataTable(data)
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
    title: 'CPU usage during last {timePlaceholder}',
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

  var chart = new google.visualization.LineChart($('<div class="container">').prependTo(document.body)[0])
  chart.draw(data, options)
}
function handleErr (err) {
  console.warn(err.responseText)
}
