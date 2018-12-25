import mapper from 'utils/mapper'
import removeSpaces from 'utils/remove-spaces'
import getById from 'api/dictionary/getById'

/**
 * @param {string} id
 * @param {{slug:string,name:string,isFlat:boolean,isOpen:boolean,placeholderRule:string}} data
 */
export default async function updateById(id, { slug, name, isFlat, isOpen, placeholderRule }) {
  const dictionaryModel = await getById(id)

  const newDictionaryModel = Object.assign(dictionaryModel, {
    slug,
    name: name::removeSpaces(),
    isFlat,
    isOpen,
    placeholderRule: placeholderRule::removeSpaces(),
  })

  return await mapper.update(newDictionaryModel)
}
