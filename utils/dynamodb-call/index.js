import AWS from 'aws-sdk'

/**
 * Alias for dynamoDB
 * @param {string} action
 * @param {object} params
 * @returns {Promise<any>}
 */
export function dynamoDBCall(action, params) {
  return new AWS.DynamoDB.DocumentClient()[action](params).promise()
}
