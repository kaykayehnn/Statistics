const express = require('express')
let handlers = require('../handlers/index')

module.exports = (app, config) => { // add app to arguments
  handlers = handlers(config)
  const home = '/hour'

  app.get(/^\/(hour|day|week|)$/i, handlers.homePage)
  app.get('/data', handlers.data)
  app.get('/index*', (req, res) => res.redirect(home))
  app.use(express.static('public'))

  app.all('*', handlers.notFound)
  app.listen(config.port)
}
