define(['drawer'], function (drawer) {
  $(function () {
    var data = $('#data').remove().text()
    data = JSON.parse(data)

    drawer(data)
  })
})
