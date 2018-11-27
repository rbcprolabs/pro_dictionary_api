import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

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
    throw new CustomError(ERROR.NOT_EXIST, `Dictionary "${id}" does not exist`)
  }
}
