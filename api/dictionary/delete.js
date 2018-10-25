import * as dynamoDbLib from 'utils/dynamodb-lib'
import {
  success,
  failure,
} from 'utils/response-lib'

export default async function (event, _context, callback) {
  const params = {
    TableName: process.env.dictionaryTableName,
    Key: {
      slug: event.pathParameters.id
    }
  }

  try {
    await dynamoDbLib.call('delete', params)
    callback(null, success({
      status: true
    }))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false
    }))
  }
}
