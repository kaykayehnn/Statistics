define(['peaks/popovers/actions'], function (actions) {
  return function (target) {
    target
      .mousedown(function (e) {
        e.stopImmediatePropagation()
        actions(e.target).toggle()
      })
      .focus(function (e) {
        actions(e.target).show()
      })
      .blur(function (e) {
        actions(e.target).hide()
      })
  }
})
