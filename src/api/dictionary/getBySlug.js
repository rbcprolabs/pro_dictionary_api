import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import ResponseError from 'utils/response-error'
import { AttributePath } from '@aws/dynamodb-expressions/build/AttributePath'

/**
 * @param {string} slug
 */
export default async function getBySlug(slug) {
  let dictionary
  const scan = mapper.scan(DictionaryModel, {
    filter: {
      type: 'Equals',
      subject: new AttributePath('slug'),
      object: slug,
    },
  })
  for await (const item of scan)
    dictionary = item

  if (!dictionary)
    throw new ResponseError(ResponseError.NOT_EXIST, `Dictionary "${slug}" does not exist`)

  return dictionary
}
