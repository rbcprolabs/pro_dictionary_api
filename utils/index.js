import AWS from 'aws-sdk'
import cyrillicToTranslit from './cyrillic-to-translit'
import makeBatchWriteRequest from './batch-request'

/**
 * Remove space from start & end string
 * @param {string} text
 * @returns {string}
 *
 * @example
 * removeSpaces(" Text ") // "Text"
 */
export function removeSpaces(text) {
  return text.replace(/(^\s*)|(\s*)$/g, '')
}

/**
 * Alias for dynamoDB
 * @param {string} action
 * @param {object} params
 * @returns {Promise<any>}
 */
export function dynamoDBCall(action, params) {
  return new AWS.DynamoDB.DocumentClient()[action](params).promise()
}

export {
  cyrillicToTranslit,
  makeBatchWriteRequest,
}
