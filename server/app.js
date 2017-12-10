let env = process.env.NODE_ENV || 'development'
const app = require('express')()
const http = require('http').Server(app)

const config = require('./config/settings')(env)
const ee = require('./logging/eventEmitter')
require('./config/db')(config)
require('./logging/dataCollector')(ee, config)
require('./config/express')(app, config)
require('./config/routes')(app, config)
require('./config/sockets')(http, ee, config)

http.listen(config.port, () => {
  console.log(`Server running on ${config.port}`)
})
