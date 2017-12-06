const fiveMin = 1000 * 300
const rgx = /^(?:.+?\s){7}/
const tableBtns = $('tbody tr button')
const dimensions = getViewPort()

google.charts.load('current', { 'packages': ['corechart'] })

tableBtns.click(function (e) {
  var target = $(e.target)
  if (target.hasClass('active')) {
    target.removeClass('active')
    toggleAllNotActiveButtons(true)
    target.popover('hide')
  } else if (!target.hasClass('disabled')) {
    setActive(target)
    setPopoverContent(target)
  }
})
function getViewPort () {
  var doc = $(window)
  return { width: doc.width(), height: doc.height() }
}
function setPopoverContent (target) {
  var date = new Date(formatDate(target.parent().text()))
  requestData(date)
    .then(formatData)
    // .then(saveInStorage)
    .then(drawChart)
    .then(function (div) {
      var options = {
        title: 'Details',
        content: div.html(),
        html: true,
        trigger: 'manual',
        placement: 'top',
        container: 'body'
      }
      target.popover(options)
      target.popover('show')
    })
    .catch(handleErr)
}
function setActive (btn) {
  btn.addClass('active')
  toggleAllNotActiveButtons(false)
}
// true for enable, false for disable
function toggleAllNotActiveButtons (state) {
  state = !state
  tableBtns.filter(':not(.active)').toggleClass('disabled', state)
}
function formatDate (text) {
  var match = rgx.exec(text)
  return match[0]
}
function requestData (date) {
  var startDate = date.getTime() - fiveMin
  var endDate = date.getTime() + fiveMin
  var data = { startDate, endDate }
  return $.ajax({
    url: '/data',
    data
  })
}
function formatData (data) {
  for (var i = 0; i < data.length; i++) {
    data[i] = [new Date(data[i].date), data[i].data.cpu]
  }
  data.splice(0, 0, ['Time', 'Usage'])
  var dataTable = google.visualization.arrayToDataTable(data)
  return dataTable
}
function drawChart (dataTable) {
  // returns not attached div with chart
  var width = Math.max(dimensions.width * 0.5, 300)
  var height = Math.max(width * 0.5, 300)
  var options = {
    width,
    height,
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
  }

  var div = $('<div class="container-fluid">')
  var chart = new google.visualization.LineChart(div[0])
  chart.draw(dataTable, options)
  return div
}
function handleErr (err) {
  console.warn(err.responseText)
}
