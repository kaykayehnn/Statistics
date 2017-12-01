let env = 'development'
const app = require('express')()

const config = require('./config/settings')(env)
require('./config/db')(config)
require('./config/express')(app, config)
require('./config/routes')(app, config)

app.listen(config.port)
console.log('Server running')

// require('./logger')
