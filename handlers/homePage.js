const fs = require('fs')
const path = require('path')

module.exports = (config) => {
  return (req, res) => {
    fs.readFile(path.join(config.contentFolder, 'index.html'), (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      res.end(data)
    })
  }
}
