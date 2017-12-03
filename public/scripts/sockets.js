$(document).ready(function () {
  var socket = io()
  socket.on('peak', (data) => {
    var currentAlerts = $('.alert-danger:visible')
    var element = $('<div class="alert alert-danger" style="display:none"></div>')
      .html('<strong>High CPU Usage! ' + data + '%</strong>')
      .click(function (e) { $(e.target).fadeOut(removeHidden) })
    var removeHidden = function () { $('.alert-danger:hidden').remove() }
    var add = function () { element.prependTo($('#alerts')).fadeIn() }
    console.log(currentAlerts.length)
    if (currentAlerts.length >= 3) {
      currentAlerts.last().fadeOut(function () { removeHidden(); add() })
    } else {
      add()
    }
  })
})
