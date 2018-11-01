import {
  success,
  failure,
} from 'utils/response'
import {
  dynamoDBCall,
} from 'utils'

function getStartKeyByFullTerm(fullTerm) {
  const fullTermArray = fullTerm.split('/')
  return {
    term: fullTermArray.splice(fullTermArray.length - 1, 1)[0],
    parent: fullTermArray.join('/'),
  }
}

export default async function (event, _context, callback) {
  const
    {
      limit = 20,
      lastEvaluatedKey,
      parent,
    } = event.queryStringParameters,
    params = {
      TableName: process.env.termTableName,
      KeyConditionExpression: 'parent = :parent',
      ExpressionAttributeValues: {
          ':parent': parent,
      },
      Limit: limit,
      ExclusiveStartKey: lastEvaluatedKey && getStartKeyByFullTerm(lastEvaluatedKey),
    }

  try {
    const result = await dynamoDBCall('query', params)
    callback(null, success({
      items: result.Items,
      count: result.Count,
      lastEvaluatedKey: result.LastEvaluatedKey && `${result.LastEvaluatedKey.parent}/${result.LastEvaluatedKey.term}`
    }))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false,
    }))
  }
}

// function getByDictionary(dictionary, limit, lastEvaluatedKey) {
//   const params = {
//     TableName: process.env.termTableName,
//     Key: {
//       dictionary,
//     },
//     Limit: limit,
//     ExclusiveStartKey: lastEvaluatedKey && {
//       fullTerm: lastEvaluatedKey,
//     },
//   }

//   return dynamoDBCall('scan', params)
// }

// function getByFullTerm(fullTerm, limit, lastEvaluatedKey) {

// }
