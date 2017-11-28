const express = require('express')
let handlers = require('../handlers/index')

module.exports = (app, config) => { // add app to arguments
  handlers = handlers(config)
  app.use(express.static(config.contentFolder))

  app.get(/^\/(hour|day|week|)$/i, handlers.homePage)
  app.get('/data', handlers.data)

  app.listen(config.port)
}
