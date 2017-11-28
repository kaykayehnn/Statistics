const fs = require('fs')
const path = require('path')

module.exports = (config) => (req, res) => {
  let p = path.normalize(path.join(__dirname, '../../public/index.html'))
  fs.readFile(p, (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    res.end(data)
  })
}
