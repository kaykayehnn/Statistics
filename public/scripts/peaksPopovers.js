const fiveMin = 1000 * 300
$('tbody tr').eq(0).hover(function (e) {
  var target = e.target
  console.log(target.textContent)
  var targetDate = new Date(target.textContent)
  requestData(targetDate)
}, function (e) {
  // out
})

function requestData (date) {
  var startDate = date.getTime() - fiveMin
  var endDate = date.getTime() + fiveMin
  var data = { startDate, endDate }
  $.ajax({
    url: '/data',
    data,
    success: drawChart,
    error: handleErr
  })
}

function drawChart (data) {
  console.log(data)
}
function handleErr (err) {
  alert(err.message)
}
