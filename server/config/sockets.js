module.exports = (http, ee, config) => {
  const io = require('socket.io')(http)

  let checkIfHigh = (data) => {
    if (data >= config.cpuThreshold) io.emit('peak', data)
  }

  ee.addListener('data', checkIfHigh)
  io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('disconnect', () => console.log('dc'))
  })
}
