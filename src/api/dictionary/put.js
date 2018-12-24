import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import removeSpaces from 'utils/remove-spaces'

/**
 * @param {{slug:string,name:string,isFlat:boolean,isOpen:boolean,placeholderRule:string}} data
 */
export default async function put({ slug, name, isFlat, isOpen, placeholderRule }) {
  const dictionaryModel = Object.assign(new DictionaryModel, {
    slug,
    name: name::removeSpaces(),
    isFlat,
    ...(() => isFlat && { isOpen })(),
    placeholderRule: placeholderRule::removeSpaces(),
  })

  return await mapper.put(dictionaryModel)
}
