import * as dynamoDbLib from 'utils/dynamodb-lib'
import {
  success,
  failure,
} from 'utils/response-lib'

export default async function (event, _context, callback) {
  const
    data = JSON.parse(event.body),
    {
      isFlat = false,
      isOpen = false,
    } = data,
    params = {
      TableName: 'dictionary',
      Key: {
        slug: event.pathParameters.id
      },
      UpdateExpression: 'SET isFlat = :isFlat, isOpen = :isOpen',
      ExpressionAttributeValues: {
        ':isFlat': isFlat,
        ':isOpen': isOpen,
      },
      // ExpressionAttributeNames: {
      //   '#name': 'name'
      // },
      ReturnValues: 'ALL_NEW'
    }

  try {
    await dynamoDbLib.call('update', params)
    callback(null, success({
      status: true,
    }))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false,
    }))
  }
}
