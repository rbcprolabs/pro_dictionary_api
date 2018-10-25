import * as dynamoDbLib from 'utils/dynamodb-lib'
import {
  success,
  failure
} from 'utils/response-lib'

export default async function (event, _context, callback) {
  const params = {
    TableName: process.env.dictionaryTableName,
    Key: {
      slug: event.pathParameters.id
    }
  }

  try {
    const result = await dynamoDbLib.call('get', params)
    if (result.Item) {
      callback(null, success(result.Item))
    } else {
      callback(null, failure({
        status: false,
        error: 'Item not found.'
      }))
    }
  } catch (error) {
    console.error(process.env)

    console.error(error)
    callback(null, failure({
      status: false
    }))
  }
}
