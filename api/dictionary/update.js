import {
  success,
  failure,
} from 'utils/response-lib'
import {
  dynamoDBCall,
} from 'utils'

export default async function (event, _context, callback) {
  const
    data = JSON.parse(event.body),
    {
      isFlat = false,
      isOpen = false,
    } = data,
    params = {
      TableName: process.env.dictionaryTableName,
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
    await dynamoDBCall.call('update', params)
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
