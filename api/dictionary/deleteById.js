import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {string} id
 */
export default async function deleteById(id) {
  const dictionaryModel = Object.assign(new DictionaryModel, {
    id,
  })

  const result = await mapper.delete(dictionaryModel)

  if (!result) throw new CustomError(ERROR.NOT_EXIST, `Dictionary "${id}" does not exist`)

  return result
}
