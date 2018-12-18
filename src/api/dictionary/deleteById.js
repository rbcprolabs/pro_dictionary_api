import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import ResponseError from 'utils/response-error'

/**
 * @param {string} id
 */
export default async function deleteById(id) {
  const dictionaryModel = Object.assign(new DictionaryModel, {
    id,
  })

  const result = await mapper.delete(dictionaryModel)

  if (!result)
    throw new ResponseError(ResponseError.NOT_EXIST, `Dictionary "${id}" does not exist`)

  return result
}
