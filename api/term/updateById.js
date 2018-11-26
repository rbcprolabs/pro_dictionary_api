import dynamoDBCall from 'utils/dynamodb-call'

/**
 * @param {string} id
 * @param {string[]} data.children
 */
export default async function updateById(id, { children }) {
  const params = {
    TableName: process.env.termTableName,
    Key: {
      id,
    },
    UpdateExpression: 'SET children = list_append(if_not_exists(children, :emptyList), :children)',
    ExpressionAttributeValues: {
      ':children': children,
      ':emptyList': [],
    },
    ReturnValues: 'ALL_NEW',
  }

  return await dynamoDBCall('update', params)
}
