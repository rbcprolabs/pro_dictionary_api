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
    Key: {
      slug: event.pathParameters.id,
    },
  }

  try {
    await dynamoDBCall('delete', params)
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
