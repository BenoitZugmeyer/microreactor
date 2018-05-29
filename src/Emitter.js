module.exports = class Emitter extends Set {
  emit(event) {
    this.forEach(fn => fn(event))
  }
}
