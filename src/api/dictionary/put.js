import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import removeSpaces from 'utils/remove-spaces'

/**
 * @param {string} data.slug
 * @param {string} data.name
 * @param {boolean} data.isFlat
 * @param {boolean} data.isOpen
 */
export default async function put({ slug, name, isFlat, isOpen }) {
  const dictionaryModel = Object.assign(new DictionaryModel, {
    slug,
    name: removeSpaces(name),
    isFlat,
    ...(() => isFlat && { isOpen })(),
  })

  return await mapper.put(dictionaryModel)
}
