import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import ResponseError from 'utils/response-error'

/**
 * @param {string} id
 */
export default async function getById(id) {
  const dictionaryModel = Object.assign(new DictionaryModel, {
    id,
  })

  try {
    return await mapper.get(dictionaryModel)
  } catch (error) {
    throw new ResponseError(ResponseError.NOT_EXIST, `Dictionary "${id}" does not exist`)
  }
}
