define(['peaks/popovers/creator', 'peaks/popovers/events'], function (creator, eventAttacher) {
  return function () {
    const tableBtns = $('tbody tr button')

    tableBtns
      .one('focus', createPopoverAndAttachListeners)

    function createPopoverAndAttachListeners (e) {
      var target = $(e.target)
      var dateText = formatDate(target.parent().text())
      var date = new Date(dateText)
      creator(target, date)
      eventAttacher(target)

      function formatDate (text) {
        const rgx = /^(?:.+?\s){7}/
        var match = rgx.exec(text)
        return match[0]
      }
    }
  }
})
