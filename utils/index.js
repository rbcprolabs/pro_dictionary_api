import AWS from 'aws-sdk'
import cyrillicToTranslit from './cyrillic-to-translit'

/**
 * Remove space from start & end string
 * @param {string} text
 * @returns {string}
 *
 * @example
 * const text = " Text "
 * removeSpaces(text) // "Text"
 */
export function removeSpaces(text) {
  return text.replace(/(^\s*)|(\s*)$/g, '')
}

/**
 * Alias for aws-sdk
 * @param {string} action
 * @param {object} params
 * @returns {Promise}
 */
export function dynamoDBCall(action, params) {
  return new AWS.DynamoDB.DocumentClient()[action](params).promise()
}

export {
  cyrillicToTranslit,
}
