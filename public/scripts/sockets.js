$(document).ready(function () {
  var socket = io()
  var removeHidden = function () {
    $('.alert:hidden').remove()
  }
  var add = function (element) {
    element.prependTo($('#alerts')).fadeIn()
  }
  var fadeOut = function (e) {
    var element = $(e.target.tagName === 'STRONG' ? e.target.parentElement : e.target)
    element.fadeOut(removeHidden)
  }

  socket.on('peak', (data) => {
    var getClasses = function () {
      return 'alert ' + (data >= 100 ? 'alert-danger' : 'alert-info')
    }
    var getHtml = function () {
      if (data >= 100) {
        return '<strong>High CPU Usage! ' + data + '%</strong>'
      } return 'Normal CPU Usage. ' + data + '%'
    }
    var addAndRemoveHidden = function () {
      removeHidden()
      add(element)
    }
    var currentAlerts = $('.alert:visible')
    var element = $('<div>')
      .addClass(getClasses)
      .html(getHtml)
      .click(fadeOut)

    if (currentAlerts.length >= 3) {
      currentAlerts
        .last()
        .fadeOut(addAndRemoveHidden)
    } else {
      add(element)
    }
  })
})
