let handlers = require('../handlers/index')

module.exports = (app, config) => {
  handlers = handlers(config)

  app.get('/', (req, res) => res.redirect('/hour'))
  app.get(/^\/(hour|day|week)$/i, handlers.homePage)
  app.get('/data', handlers.data)
  app.get('/peaks', handlers.peaks)
  app.get('/index*', (req, res) => res.redirect('/hour'))

  app.all('*', handlers.notFound)
}
