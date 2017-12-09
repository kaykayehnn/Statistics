define(function () {
  var obj = function (target1) {
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
  obj.hideAll = hideAll
  return obj

  function hideAll (but) {
    $('.hasPopover').each(function (ix, el) {
      if (el !== but) {
        obj(el).hide()
      }
    })
  }
})
