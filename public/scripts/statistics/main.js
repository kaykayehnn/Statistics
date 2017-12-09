require.config({
  baseUrl: 'scripts',
  paths: {
    lineChart: 'common/lineChart',
    formatter: 'common/formatter',
    drawer: 'statistics/drawer'
  }
})

requirejs(['statistics/entry'])
