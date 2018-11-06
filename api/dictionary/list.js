import {
  success,
  failure,
} from 'utils/response'
import {
  dynamoDBCall,
} from 'utils'

export default async function (event, _context, callback) {
  const
    {
      limit = 5,
      lastEvaluatedKey,
    } = event.queryStringParameters,
    params = {
      TableName: process.env.dictionaryTableName,
      Limit: limit,
      ExclusiveStartKey: lastEvaluatedKey && {
        slug: lastEvaluatedKey,
      },
    }

  try {
    const result = await dynamoDBCall('scan', params)
    callback(null, success({
      items: result.Items,
      count: result.Count,
      lastEvaluatedKey: result.LastEvaluatedKey && result.LastEvaluatedKey.slug
    }))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false,
    }))
  }
}
