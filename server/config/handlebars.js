const hbs = require('express-handlebars')

let stringify = (obj) => {
  return JSON.stringify(obj)
}
let instance = hbs.create({
  defaultLayout: 'main',
  helpers: {
    stringify
  }
})

module.exports = instance
