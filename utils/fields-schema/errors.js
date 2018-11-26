import SchemaError from './error'

export default {
  NOT_EXIST: (fieldName) => new SchemaError(`Field "${fieldName}" does not exist`),
  WRONG_TYPE: (fieldName) => new SchemaError(`Field "${fieldName}" has wrong type`),
  MIN: (fieldName, min) => new SchemaError(`Field "${fieldName}" length < ${min}`),
  MAX: (fieldName, max) => new SchemaError(`Field "${fieldName}" length > ${max}`),
  PATTERN: (fieldName, pattern) => new SchemaError(`Field "${fieldName}" does not match pattern ${pattern}`),
}
