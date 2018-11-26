import dynamoDBCall from 'utils/dynamodb-call'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {string} name
 */
export default async function getByName(name) {
  const params = {
    TableName: process.env.dictionaryTableName,
    FilterExpression: '#name = :name',
    ExpressionAttributeNames: {
      '#name': name,
    },
    ExpressionAttributeValues: {
        ':name': event.pathParameters.name,
    },
    Limit: 1,
  }

  const result = await dynamoDBCall('scan', params)

  if (result.Items[0]) {
    return result.Items[0]
  } else {
    throw new CustomError(ERROR.NOT_EXIST, `Dictionary "${name}" does not exist`)
  }
}
