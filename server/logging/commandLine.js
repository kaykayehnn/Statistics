const exec = require('child_process').exec

module.exports = (config, ee) => {
  let getCpu = () => {
    exec(config.getCpuCommand, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return
      }

      let res = stdout.trim()
      ee.emit('data', res)
    })
  }
  return { getCpu }
}
