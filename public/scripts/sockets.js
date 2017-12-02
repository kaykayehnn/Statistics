var socket = io()
socket.on('peak', (data) => {
  var currentAlerts = $('.alert-danger')
  var element = $('<div class="alert alert-danger" style="display:none"></div>').html('<strong>High CPU Usage! ' + data + '%</strong>')
  console.log(currentAlerts.length)
  if (currentAlerts.length >= 3) {
    currentAlerts.last().fadeOut()
  }
  element.prependTo($('#alerts')).fadeIn()
  element.click(e => $(e.target).fadeOut())
})

// $('form').submit((e) => {
//   socket.emit('chat message', $('#m').val())
//   $('#m').val('')
//   e.preventDefault()
// })
// socket.on('chat message2', msg => {
//   $('#messages').append($('<li>').text(msg))
// })
