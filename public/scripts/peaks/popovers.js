define(['lineChart', 'requester', 'formatter'], function (linechart, requester, formatter) {
  return function () {
    const fiveMin = 1000 * 300
    const rgx = /^(?:.+?\s){7}/
    const tableBtns = $('tbody tr button')
    const dimensions = getViewPort()

    tableBtns
      .one('focus', createPopoverAndAttachListeners)

    function getViewPort () {
      var doc = $(window)
      return { width: doc.width(), height: doc.height() }
    }
    function popoverActions (target1) {
      var funcFactory = function (action) {
        return function (target2) {
          $(target1 || target2).popover(action)
        }
      }
      var show = funcFactory('show')
      var hide = funcFactory('hide')
      var toggle = funcFactory('toggle')
      return { show, hide, toggle }
    }
    function createPopoverAndAttachListeners (e) {
      var target = $(e.target)
      createPopover(target)
        .then(popoverActions().show)

      target
        .mousedown(function (e) {
          e.stopImmediatePropagation()
          console.log(5)
          popoverActions(e.target).show()
        })
        .focus(function (e) {
          console.log(6)
          popoverActions(e.target).show()
        })
        .blur(function (e) {
          console.log(7)
          popoverActions(e.target).hide()
        })
    }
    function createPopover (target) {
      var dateText = formatDate(target.parent().text())
      var date = new Date(dateText)
      var options = getRequestOptions(date)
      return requester(options)
        .then(formatter)
        .then(drawChart)
        .then(setOptions)
        .catch(console.error)

      function setOptions (div) {
        var options = {
          title: 'Details',
          content: div.html(),
          html: true,
          trigger: 'manual',
          placement: 'top',
          container: 'body'
        }

        return target
          .popover(options)
      }
    }
    function formatDate (text) {
      var match = rgx.exec(text)
      return match[0]
    }
    function getRequestOptions (date) {
      var startDate = date.getTime() - fiveMin
      var endDate = date.getTime() + fiveMin
      return {
        url: '/data',
        data: {
          startDate,
          endDate
        }
      }
    }
    function drawChart (dataTable) {
      var width = Math.max(dimensions.width * 0.5, 300)
      var height = Math.max(width * 0.5, 300)
      var options = { width, height }

      return linechart(dataTable, options)
    }
  }
})
