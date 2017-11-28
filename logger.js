let env = 'development'

const config = require('./config/config')(env)
const ee = require('./config/eventEmitter')
require('./config/db')(config)
require('./config/dataCollector')(config, ee)
require('./config/commandLine')(config, ee)

console.log('Database running')
