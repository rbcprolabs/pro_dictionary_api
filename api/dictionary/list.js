import * as dynamoDbLib from 'utils/dynamodb-lib'
import {
  success,
  failure,
} from 'utils/response-lib'

export default async function (event, _context, callback) {
  const params = {
    TableName: 'dictionary',
    Limit: event.queryStringParameters && event.queryStringParameters['limit'] || 5,
  }

  try {
    const result = await dynamoDbLib.call('scan', params)
    callback(null, success(result.Items))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false
    }))
  }
}
