define(['peaks/popovers/actions'], function (actions) {
  return function (target) {
    target
      .mousedown(function (e) {
        e.stopImmediatePropagation()
        hideOther(e.target)
        actions(e.target).toggle()
      })
      .focus(function (e) {
        hideOther(e.target)
        actions(e.target).show()
      })
      .blur(function (e) {
        actions(e.target).hide()
      })

    function hideOther (target) {
      var all = $('.hasPopover')
      for (var i = 0; i < all.length; i++) {
        var current = all[i]
        if (current !== target) {
          actions(current).hide()
        }
      }
    }
  }
})
