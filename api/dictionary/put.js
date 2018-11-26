import dynamoDBCall from 'utils/dynamodb-call'
import uuid from 'uuid/v1'
import removeSpaces from 'utils/remove-spaces'

/**
 * @param {Object} data
 */
export default async function put(data) {
  const params = {
    TableName: process.env.dictionaryTableName,
    Item: {
      id: uuid(),
      slug: data.slug,
      name: removeSpaces(data.name),
      isFlat: data.isFlat,
      isOpen: data.isOpen,
    },
  }

  await dynamoDBCall('put', params)
  return params.Item
}
