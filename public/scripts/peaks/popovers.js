define(['peaks/popovers/creator', 'peaks/popovers/events', 'peaks/popovers/actions'],
  function (creator, eventAttacher, actions) {
    return function () {
      const tableBtns = $('tbody tr button')
      const alreadyHandled = handledChecker()

      tableBtns
        .one('focus click', createPopoverAndAttachListeners)

      function handledChecker () {
        const handled = {}
        return function (target) {
          if (!handled[target]) {
            handled[target] = true
            return false
          }
          return true
        }
      }
      function createPopoverAndAttachListeners (e) {
        var target = $(e.target)
        var dateText = formatDate(target.parent().text())
        if (alreadyHandled(dateText)) {
          return
        }

        actions('.hasPopover').hide()
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
