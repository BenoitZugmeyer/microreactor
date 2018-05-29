const Emitter = require("./Emitter")

exports.variableGetEmitter = new Emitter()
exports.variableSetEmitter = new Emitter()

exports.batchedVariableSetEmitter = new Emitter()

let lockCount = 0
const variableBatch = new Set()

exports.variableSetEmitter.add(variable => {
  // Collect modified variables
  if (lockCount) variableBatch.add(variable)
  else exports.batchedVariableSetEmitter.emit([variable])
})

exports.incLock = () => {
  lockCount++
}

exports.decLock = () => {
  if (lockCount === 0) return
  lockCount--
  if (lockCount === 0 && variableBatch.size) {
    const finalizedVariableBatch = Array.from(variableBatch)
    variableBatch.clear()
    exports.batchedVariableSetEmitter.emit(finalizedVariableBatch)
  }
}
