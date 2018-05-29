const Variable = require("./Variable")
const runAndObserve = require("./runAndObserve")

function getLatestTimestamp(variables) {
  let timestamp = 0
  variables.forEach(variable => {
    if (variable.timestamp > timestamp) timestamp = variable.timestamp
  })
  return timestamp
}

module.exports = function createComputed(fn) {
  const resultVariable = new Variable()
  let resultDependencies
  return () => {
    if (
      !resultDependencies ||
      getLatestTimestamp(resultDependencies) > resultVariable.timestamp
    ) {
      const { dependencies, result } = runAndObserve(fn)
      resultDependencies = dependencies
      resultVariable.set(result)
    }
    return resultVariable.get()
  }
}
