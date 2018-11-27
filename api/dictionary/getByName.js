import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {string} name
 */
export default async function getByName(name) {
  let dictionaryModel
  for await (const item of mapper.scan(DictionaryModel))
    if (item.name === name) return dictionaryModel = item

  if (!dictionaryModel)
    throw new CustomError(ERROR.NOT_EXIST, `Dictionary "${name}" does not exist`)

  return dictionaryModel
}
