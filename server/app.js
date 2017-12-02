let env = 'development'
const app = require('express')()

const config = require('./config/settings')(env)
const ee = require('./logging/eventEmitter')
require('./config/db')(config)
require('./logging/dataCollector')(config, ee)
require('./logging/commandLine')(config, ee)
require('./config/express')(app, config)
require('./config/routes')(app, config)

console.log('Database running')
app.listen(config.port)
console.log('Server running')

// require('./logger')
