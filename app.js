const env = 'development'
const app = require('express')()

const config = require('./config/config')(env)
// const cl = require('./config/commandLine')(config)
// require('./config/logger')(cl, config)
require('./config/db')(config)
require('./config/express')(app, config)

console.log('Server running')
