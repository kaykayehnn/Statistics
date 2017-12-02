module.exports = (ee, config) => {
  const basic = require('./basic')(ee, config)
  const custom = require('./custom')
  return [basic, custom]
}
