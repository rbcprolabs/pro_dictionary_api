import dynamoDBCall from 'utils/dynamodb-call'

/**
 * @param {string} id
 */
export default async function deleteById(id) {
  const params = {
    TableName: process.env.dictionaryTableName,
    Key: {
      id,
    },
  }

  return await dynamoDBCall('delete', params)
}
