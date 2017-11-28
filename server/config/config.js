const conf = {
  development: {
    port: 3000,
    interval: 5000,
    cpuThreshold: 400
  },
  production: {
    port: 9988,
    interval: 10000,
    cpuThreshold: 150
  }
}

let keys = ['development', 'production']
for (let key of keys) {
  conf[key].dbPath = 'mongodb://localhost:27017/statistics'
  conf[key].getCpuCommand = 'ps -A -o %cpu | awk \'{s+=$1} END {print s }\''
  conf[key].pointsPerGraphic = 60
} // same in both envs

module.exports = (env) => {
  return conf[env]
}
