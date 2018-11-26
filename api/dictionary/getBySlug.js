import dynamoDBCall from 'utils/dynamodb-call'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {string} slug
 */
export default async function getBySlug(slug) {
  const params = {
    TableName: process.env.dictionaryTableName,
    FilterExpression: 'slug = :slug',
    ExpressionAttributeValues: {
        ':slug': slug,
    },
    Limit: 1,
  }

  const result = await dynamoDBCall('scan', params)

  if (result.Items[0]) {
    return result.Items[0]
  } else {
    throw new CustomError(ERROR.NOT_EXIST, `Dictionary "${slug}" does not exist`)
  }
}
