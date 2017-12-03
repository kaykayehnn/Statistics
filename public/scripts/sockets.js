$(document).ready(function () {
  var socket = io()
  const CPUThreshold = 100
  const fadeTime = 600

  socket.on('peak', (data) => {
    var currentAlert = $('.alert')
    if (currentAlert.length === 0) {
      $('<div>')
        .addClass(getClasses)
        .html(getHtml)
        .hide()
        .fadeIn()
        .appendTo($('.container-fluid'))
    } else {
      var prevUsage = Number(currentAlert.text().split('').reduce(reduceToNumber))
      currentAlert
        .removeClass()
        .addClass(getClasses)
        .html(getHtml)
    }

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
    function reduceToNumber (a, b) {
      if (a !== '' && !isNumber(a)) a = ''
      if (isNumber(b) || b === '.') {
        return a + b
      }
      return a
      function isNumber (c) {
        return (c >= '0' && c <= '9')
      }
    }
  })
})
