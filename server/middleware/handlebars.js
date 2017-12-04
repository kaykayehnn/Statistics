const hbs = require('express-handlebars')

let stringify = (obj) => {
  return JSON.stringify(obj)
}

module.exports = () => hbs.create({
  defaultLayout: 'main',
  helpers: {
    stringify
  }
})
