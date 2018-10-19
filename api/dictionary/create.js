import cyrillicToTranslit from 'utils/cyrillicToTranslit'
import * as dynamoDbLib from 'utils/dynamodb-lib'
import {
  success,
  failure,
} from 'utils/response-lib'

export default async function (event, _context, callback) {
  const
    data = JSON.parse(event.body),
    {
      name,
      isFlat,
      isOpen,
    } = data,
    params = {
      TableName: 'dictionary',
      Item: {
        slug: cyrillicToTranslit(name, '_').toLowerCase(),
        name,
        isFlat,
        isOpen,
      }
    }

  try {
    await dynamoDbLib.call('put', params)
    callback(null, success(params.Item))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false
    }))
  }
}
