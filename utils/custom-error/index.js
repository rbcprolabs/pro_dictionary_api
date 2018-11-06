import CODE from './codes'
export { CODE }

export default class CustomError extends Error {
  /**
   * @param {string} name
   * @param {string} message
   * @param  {...any} args
   */
  constructor(name, message, ...args) {
    super(message, ...args)
    this.name = 'name' in name ? name.name : name
    Error.captureStackTrace(this, this.constructor)
  }
}
