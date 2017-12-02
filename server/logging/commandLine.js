const exec = require('child_process').exec

module.exports = (ee, config) => {
  let getCpu = () => {
    exec(config.getCpuCommand, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return
      }

      let res = Number(stdout.trim())
      ee.emit('data', res)
    })
  }
  return { getCpu }
}
