require.config({
  baseUrl: 'scripts',
  paths: {
    lineChart: 'common/lineChart',
    requester: 'common/requester',
    formatter: 'common/formatter',
    storage: 'common/storage'
  }
})

requirejs(['peaks/entry'])
