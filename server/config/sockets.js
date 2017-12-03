module.exports = (http, ee, config) => {
  const io = require('socket.io')(http)

  ee.addListener('data', data => io.emit('peak', data))
  io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('disconnect', () => console.log('dc'))
  })
}
