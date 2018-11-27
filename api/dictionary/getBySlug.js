import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {string} slug
 */
export default async function getBySlug(slug) {
  let dictionary
  for await (const item of mapper.scan(DictionaryModel))
    if (item.slug === slug) return dictionary = item

  if (!dictionary)
    throw new CustomError(ERROR.NOT_EXIST, `Dictionary "${slug}" does not exist`)

  return dictionary
}
