define(['peaks/table', 'peaks/popovers'], function (table, popovers) {
  $(function () {
    var data = $('#data').remove().text()
    data = JSON.parse(data)
    table(data)
      .appendTo('#table')

    popovers()
  })
})
