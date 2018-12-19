import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import ResponseError from 'utils/response-error'
import { AttributePath } from '@aws/dynamodb-expressions/build/AttributePath'

/**
 * @param {string} name
 */
export default async function getByName(name) {
  let dictionaryModel
  const scan = mapper.scan(DictionaryModel, {
    filter: {
      type: 'Equals',
      subject: new AttributePath('name'),
      object: name,
    },
  })
  for await (const item of scan)
    dictionaryModel = item

  if (!dictionaryModel)
    throw new ResponseError(ResponseError.NOT_EXIST, `Dictionary "${name}" does not exist`)

  return dictionaryModel
}
