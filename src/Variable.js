const { variableGetEmitter, variableSetEmitter } = require("./globalRegistry")

let timestamp = 0

module.exports = class Variable {
  constructor(v) {
    this._v = v
    this._t = ++timestamp
  }

  get timestamp() {
    return this._t
  }

  get() {
    variableGetEmitter.emit(this)
    return this._v
  }

  set(v, silent) {
    // if (variableGetEmitter.size) {
    //   throw new Error("Can't set a variable when some observer is running")
    // }
    if (this._v === v) return
    this._v = v
    if (!silent) {
      this._t = ++timestamp
      variableSetEmitter.emit(this)
    }
  }
}
