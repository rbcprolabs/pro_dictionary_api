import {
  success,
  failure,
} from 'utils/response-lib'
import {
  dynamoDBCall,
} from 'utils'

export default async function (event, _context, callback) {
  const params = {
    TableName: process.env.dictionaryTableName,
    Limit: event.queryStringParameters && event.queryStringParameters['limit'] || 5,
  }

  try {
    const result = await dynamoDBCall('scan', params)
    callback(null, success(result.Items))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false
    }))
  }
}
