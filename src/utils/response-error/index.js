export default class ResponseError extends Error {
  static NOT_EXIST = 404
  static NOT_ACCEPTABLE = 406

  /**
   * @param {string} error
   * @param {string} message
   * @param  {...any} args
   */
  constructor(errorCode, message, ...args) {
    super(message, ...args)
    this.name = 'ResponseError'
    this.code = errorCode
    Error.captureStackTrace(this, this.constructor)
  }
}
