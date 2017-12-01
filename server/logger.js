let env = 'development'

const config = require('./config/settings')(env)
const ee = require('./logging/eventEmitter')
require('./config/db')(config)
require('./logging/dataCollector')(config, ee)
require('./logging/commandLine')(config, ee)

console.log('Database running')
