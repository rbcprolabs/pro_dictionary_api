import {
  success,
  failure,
} from 'utils/response'
import {
  removeSpaces,
  dynamoDBCall,
  cyrillicToTranslit,
} from 'utils'

export default async function (event, _context, callback) {
  const
    data = JSON.parse(event.body),
    name = removeSpaces(data.name),
    slug = removeSpaces(data.slug
      ? data.slug.toLowerCase()
      : cyrillicToTranslit(name, '_').toLowerCase()
    ),
    {
      isFlat,
      isOpen,
    } = data,
    params = {
      TableName: process.env.dictionaryTableName,
      Item: {
        slug,
        name,
        isFlat,
        isOpen,
      },
    }

  try {
    await dynamoDBCall('put', params)
    callback(null, success(params.Item))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false,
    }))
  }
}
