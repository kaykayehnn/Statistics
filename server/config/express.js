const express = require('express')
const handlebars = require('express-handlebars')

module.exports = (app, config) => {
  app.set('view engine', 'handlebars')
  app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
  app.use(express.static('public'))
}
