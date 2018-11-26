
/**
 * Validate data by schema
 * @param {Object} schema
 * @param {Object} data
 * @return {Promise<String>} Result
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

    if (fieldValue === null && !field.optional) {
      return reject('not exist')
    }

    if ('type' in field && !(typeof fieldValue === field.type.name.toLowerCase())) {
      return reject('type error')
    }

    if ('length' in field ) {
      if ([Array, String].includes(field.type)) {
        if ('min' in field.length && fieldValue.length < field.length.min) {
          return reject('min')
        }
        if ('max' in field.length && fieldValue.length > field.length.max) {
          return reject('max')
        }
      } else if (field.type === Number) {
        if ('min' in field.length && fieldValue < field.length.min) {
          return reject('min')
        }
        if ('max' in field.length && fieldValue > field.length.max) {
          return reject('max')
        }
      }
    }

    if ('pattern' in field && typeof fieldValue === 'string' && !field.pattern.test(fieldValue)) {
      return reject('pattern')
    }
  }
  resolve('Success')
})
