const express = require('express')
const handlebars = require('./handlebars')

module.exports = (app, config) => {
  if (config.env === 'production') app.enable('view cache')
  app.engine('handlebars', handlebars.engine)
  app.set('view engine', 'handlebars')
}
