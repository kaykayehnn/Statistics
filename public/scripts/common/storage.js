define(function () {
  var get = function (key) {
    var value = JSON.parse(localStorage.getItem(key))
    return value
  }
  var set = function (key, value) {
    value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }
  var clear = localStorage.clear
  return {
    get,
    set,
    clear
  }
})
