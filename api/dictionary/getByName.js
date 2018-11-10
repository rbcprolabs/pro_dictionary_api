import {
  success,
  failure,
} from 'utils/response'
import {
  dynamoDBCall,
} from 'utils'

export default async function (event, _context, callback) {
  const params = {
    TableName: process.env.dictionaryTableName,
    FilterExpression: '#name = :name',
    ExpressionAttributeNames: {
      '#name': 'name'
    },
    ExpressionAttributeValues: {
        ':name': event.pathParameters.name,
    },
  }

  try {
    const result = await dynamoDBCall('scan', params)
    if (result.Items[0]) {
      callback(null, success(result.Items[0]))
    } else {
      callback(null, failure({
        status: false,
        error: 'Item not found.',
      }))
    }
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false,
    }))
  }
}
