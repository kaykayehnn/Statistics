let env = 'development'
const app = require('express')()

const config = require('./config/config')(env)
require('./config/db')(config)
require('./config/express')(app, config)

console.log('Server running')

// require('./logger')
