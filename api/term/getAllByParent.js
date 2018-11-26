import dynamoDBCall from 'utils/dynamodb-call'

/**
 * @param {number} limit
 * @param {string} lastEvaluatedKey id
 */
export default async function getAllByParent(parent, limit, lastEvaluatedKey) {
  const params = {
    TableName: process.env.termTableName,
    FilterExpression: 'parent = :parent',
    ExpressionAttributeValues: {
        ':parent': parent,
    },
    Limit: limit,
    ExclusiveStartKey: lastEvaluatedKey && {
      id: lastEvaluatedKey,
    },
  }

  const result = await dynamoDBCall('scan', params)
  return {
    items: result.Items,
    count: result.Count,
    lastEvaluatedKey: result.LastEvaluatedKey && result.LastEvaluatedKey.id
  }
}
