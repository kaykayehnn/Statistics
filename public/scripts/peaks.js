function drawTable (arr) {
  const thead = '<thead><tr><th>Date</th><th>CPU</th></tr></thead>'
  var table = $('<table>').addClass('table table-striped')
  var tbody = $('<tbody>')
    .appendTo(table)
  table.prepend(thead)
  for (var i = 0; i < arr.length; i++) {
    var row = getRow(arr[i])
    table.append(row)
  }
  $('#table').append(table)

  function getRow (obj) {
    obj.date = new Date(obj.date)
    return $('<tr><td>' + obj.date + '</td><td>' + obj.data.cpu + '</td</tr>')// exceptional
  }
}
