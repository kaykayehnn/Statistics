define(['lineChart', 'peaks/popovers/dataGetter'], function (lineChart, dataGetter) {
  const dimensions = getViewPort()
  var createPopover = function (target, date) {
    return dataGetter(date)
      .then(drawChart)
      .then(setOptions)
      .catch(console.error)

    function setOptions (div) {
      var options = {
        title: 'Statistics at ' + date,
        content: div.html(),
        html: true,
        trigger: 'manual',
        placement: 'top',
        container: 'body'
      }

      target
        .addClass('hasPopover')
        .popover(options)
        .popover('show')
    }
  }

  return createPopover
  function getViewPort () {
    var doc = $(window)
    return { width: doc.width(), height: doc.height() }
  }
  function drawChart (dataTable) {
    var width = Math.max(dimensions.width * 0.5, 300)
    var height = Math.max(width * 0.5, 300)
    var options = { width, height }

    return lineChart(dataTable, options)
  }
})
