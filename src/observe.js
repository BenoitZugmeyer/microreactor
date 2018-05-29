const { batchedVariableSetEmitter } = require("./globalRegistry")
const runAndObserve = require("./runAndObserve")

module.exports = function observer(fn) {
  let { dependencies } = runAndObserve(fn)

  const rerun = variables => {
    if (variables.some(variable => dependencies.has(variable))) {
      dependencies = runAndObserve(fn).dependencies
    }
  }

  batchedVariableSetEmitter.add(rerun)
  return () => {
    batchedVariableSetEmitter.delete(rerun)
  }
}
