import dynamoDBCall from 'utils/dynamodb-call'

/**
 * @param {string} id
 */
export default async function updateById(id, data) {
  const params = {
    TableName: process.env.dictionaryTableName,
    Key: {
      id,
    },
    UpdateExpression: 'SET slug = :slug, #name = :name, isFlat = :isFlat, isOpen = :isOpen',
    ExpressionAttributeValues: {
      ':slug': data.slug,
      ':name': data.name,
      ':isFlat': data.isFlat,
      ':isOpen': data.isOpen,
    },
    ExpressionAttributeNames: {
      '#name': 'name',
    },
    ReturnValues: 'ALL_NEW',
  }

  return await dynamoDBCall('update', params)
}
