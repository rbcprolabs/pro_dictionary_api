import SchemaError from './error'
import Error from './errors'

export { SchemaError, Error }

/**
 * Validate data by schema
 * @param {Object} schema
 * @param {Object} data
 * @return {Promise<number>} Result
 * @example
 * const schema = {
 *  name: {
 *    type: String,
 *    optional: false,
 *    length: {
 *      min: 3,
 *      max: 30,
 *    },
 *    pattern: /^[a-z_]+$/g,
 *  }
 * }
 * const data = {
 *  name: 'Test',
 * }
 */
export default (schema, data) => new Promise((resolve, reject) => {
  for (const [fieldName, field] of Object.entries(schema)) {
    const fieldValue = fieldName in data ? data[fieldName] : null

    if (fieldValue === null && !field.optional)
      return reject(Error.NOT_EXIST(fieldName))
    else if (fieldValue === null && field.optional)
      continue

    if ('type' in field && !(typeof fieldValue === field.type.name.toLowerCase()))
      return reject(Error.WRONG_TYPE(fieldName))

    if ('length' in field ) {
      if ([Array, String].includes(field.type)) {
        if ('min' in field.length && fieldValue.length < field.length.min)
          return reject(Error.MIN(fieldName, field.length.min))

        if ('max' in field.length && fieldValue.length > field.length.max)
          return reject(Error.MAX(fieldName, field.length.max))

      } else if (field.type === Number) {
        if ('min' in field.length && fieldValue < field.length.min)
          return reject(Error.MIN(fieldName, field.length.min))

        if ('max' in field.length && fieldValue > field.length.max)
          return reject(Error.MAX(fieldName, field.length.max))

      }
    }

    if ('pattern' in field && typeof fieldValue === 'string' && !field.pattern.test(fieldValue))
      return reject(Error.PATTERN(fieldName, field.pattern.toString()))
  }
  resolve()
})
