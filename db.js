
const config = require('./config/config')(env)
const cl = require('./config/commandLine')(config)
require('./config/db')(config)
require('./config/logger')(cl, config)

console.log('Database running')
