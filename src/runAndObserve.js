const { variableGetEmitter } = require("./globalRegistry")

module.exports = function runAndObserve(fn) {
  const dependencies = new Set()
  const addDependency = variable => dependencies.add(variable)
  variableGetEmitter.add(addDependency)
  try {
    const result = fn()
    return { dependencies, result }
  } finally {
    variableGetEmitter.delete(addDependency)
  }
}
