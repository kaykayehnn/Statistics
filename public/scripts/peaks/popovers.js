define(['lineChart', 'requester', 'formatter'], function (linechart, requester, formatter) {
  return function () {
    const fiveMin = 1000 * 300
    const rgx = /^(?:.+?\s){7}/
    const tableBtns = $('tbody tr button')
    const dimensions = getViewPort()

    tableBtns.click(function (e) {
      var target = $(e.target)
      if (target.hasClass('active')) {
        target.removeClass('active')
        toggleAllNotActiveButtons(true)
        target.popover('hide')
      } else if (!target.hasClass('disabled')) {
        setActive(target)
        setPopoverContent(target)
      }
    })
    function getViewPort () {
      var doc = $(window)
      return { width: doc.width(), height: doc.height() }
    }
    function setPopoverContent (target) {
      var dateText = formatDate(target.parent().text())
      var date = new Date(dateText)
      var options = getRequestOptions(date)
      requester(options)
        .then(formatter)
        .then(drawChart)
        .then(createPopover)
        .catch(console.error)

      function createPopover (div) {
        var options = {
          title: 'Details',
          content: div.html(),
          html: true,
          trigger: 'manual',
          placement: 'top',
          container: 'body'
        }

        target
          .popover(options)
          .popover('show')
      }
    }
    function setActive (btn) {
      btn.addClass('active')
      toggleAllNotActiveButtons(false)
    }
    // true for enable, false for disable
    function toggleAllNotActiveButtons (state) {
      state = !state
      tableBtns.filter(':not(.active)').toggleClass('disabled', state)
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
