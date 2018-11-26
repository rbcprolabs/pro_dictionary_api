import dynamoDBCall from 'utils/dynamodb-call'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {string} id
 */
export default async function getById(id) {
  const params = {
    TableName: process.env.termTableName,
    Key: {
      id,
    },
  }

  const result = await dynamoDBCall('get', params)

  if (result.Item) {
    return result.Item
  } else {
    throw new CustomError(ERROR.NOT_EXIST, `Term does not exist`)
  }
}
