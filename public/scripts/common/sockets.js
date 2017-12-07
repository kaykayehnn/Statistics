$(document).ready(function () {
  var socket = io()
  const CPUThreshold = 100
  const alertDiv = $('div.alert')
  var prevUsage

  socket.on('peak', (data) => {
    alertDiv
      .removeClass()
      .addClass(getClasses)
      .html(getHtml)

    prevUsage = data
    function getClasses () {
      return 'alert ' + (data >= CPUThreshold ? 'alert-danger' : 'alert-success')
    }
    function getHtml () {
      var glyph = getGlyph()
      return data >= CPUThreshold
        ? '<strong>High CPU Usage! ' + data + '% ' + glyph + '</strong>'
        : '<p>Normal CPU Usage. ' + data + '%  ' + glyph + '</p>'
    }
    function getGlyph () {
      if (!prevUsage || prevUsage === data) return ''
      return '<span class="glyphicon glyphicon-circle-arrow-' +
        (data >= prevUsage ? 'up' : 'down') + '"></span>'
    }
  })
})
