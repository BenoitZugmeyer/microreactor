const { incLock, decLock } = require("./globalRegistry")

module.exports = async function asyncBatch(fn) {
  incLock()
  try {
    await fn()
  } finally {
    decLock()
  }
}
