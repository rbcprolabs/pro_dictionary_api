import cyrillicToTranslit from 'utils/cyrillicToTranslit'
import {
  success,
  failure,
} from 'utils/response-lib'
import {
  removeSpaces,
  dynamoDBCall,
} from 'utils'

export default async function (event, _context, callback) {
  const
    data = JSON.parse(event.body),
    name = removeSpaces(data.name),
    {
      isFlat,
      isOpen,
    } = data,
    params = {
      TableName: process.env.dictionaryTableName,
      Item: {
        slug: cyrillicToTranslit(name, '_').toLowerCase(),
        name,
        isFlat,
        isOpen,
      }
    }

  try {
    await dynamoDBCall('put', params)
    callback(null, success(params.Item))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false
    }))
  }
}
