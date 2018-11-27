import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {string} id
 */
export default async function updateById(id, { slug, name, isFlat, isOpen }) {
  const dictionaryModel = Object.assign(new DictionaryModel, {
    id,
  })

  let dictionary
  try {
    dictionary =  await mapper.get(dictionaryModel)
  } catch (error) {
    throw new CustomError(ERROR.NOT_EXIST, `Dictionary "${id}" does not exist`)
  }

  dictionary = Object.assign(dictionary, {
    slug,
    name,
    isFlat,
    isOpen,
  })

  return await mapper.update(dictionary)
}
