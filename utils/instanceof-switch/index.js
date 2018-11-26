export default class InstanceofSwith {
  _validateValues = []

  constructor(validateEntry) {
    this._validateEntry = validateEntry
  }

  case(validateValue, callback) {
    this._validateValues.push({
      entry: validateValue,
      callback,
    })
    return this
  }

  default(callback) {
    this._defaultCallback = callback
    this.validate()
  }

  validate() {
    let calledEntry = false
    for (const item of this._validateValues) {
      if (this._validateEntry instanceof item.entry) {
        calledEntry = true
        return item.callback()
      }
    }
    if (!calledEntry) this._defaultCallback()
  }
}
