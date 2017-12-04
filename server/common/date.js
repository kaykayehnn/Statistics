let yesterday = () => {
  let date = new Date()
  date.setDate(date.getDate() - 1)
  return date
}

module.exports = { yesterday }
