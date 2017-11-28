const exec = require('child_process').exec

module.exports = (config) => {
  let getCpu = (callback) => {
    exec(config.getCpuCommand, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return
      }

      let res = stdout.trim()
      callback(res)
    })
  }
  return { getCpu }
}
