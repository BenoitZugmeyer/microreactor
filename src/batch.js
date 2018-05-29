const { incLock, decLock } = require("./globalRegistry")

module.exports = function batch(fn) {
  incLock()
  try {
    fn()
  } finally {
    decLock()
  }
}
