function drawTable (arr) {
  const thead = '<thead><tr><th>Date</th><th>CPU</th></tr></thead>'
  const lastPeakDate = new Date(Number(getFromCookie('lastPeak')))

  var table = $('<table>').addClass('table table-striped')
  var tbody = $('<tbody>')
    .appendTo(table)
  table.prepend(thead)
  for (var i = 0; i < arr.length; i++) {
    var row = getRow(arr[i])
    table.append(row)
  }
  $('#table').append(table)

  setCookie()

  function getFromCookie (key) {
    var rgx = new RegExp(key + '=([^=]+)')
    return rgx.exec(document.cookie)[1]
  }

  function getRow (obj) {
    var date = new Date(obj.date)
    var dateBox = $('<td>')
    var text = $('<p>')
      .text(date)
      .appendTo(dateBox)
    if (date > lastPeakDate) text.append(' <span class="label label-danger">New</span>')

    text.append(' <button type="button" class="btn btn-sm btn-info">Details</button>')
    var tr = $('<tr>')
      .append(dateBox)
      .append('<td>' + obj.data.cpu + '</td>')
    return tr
  }

  function setCookie () {
    document.cookie = 'lastPeak=' + new Date().getTime()
  }
}
