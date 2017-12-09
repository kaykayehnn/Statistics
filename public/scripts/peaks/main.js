require.config({
  baseUrl: 'scripts',
  paths: {
    lineChart: 'common/lineChart',
    requester: 'common/requester',
    formatter: 'common/formatter',
    table: 'peaks/table',
    popovers: 'peaks/popovers'
  }
})

requirejs(['peaks/entry'])
