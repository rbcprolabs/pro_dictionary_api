import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import ResponseError from 'utils/response-error'
import removeSpaces from 'utils/remove-spaces'

/**
 * @param {string} id
 * @param {{slug:string,name:string,isFlat:boolean,isOpen:boolean,placeholderRule:string}} data
 */
export default async function updateById(id, { slug, name, isFlat, isOpen, placeholderRule }) {
  const dictionaryModel = Object.assign(new DictionaryModel, {
    id,
  })

  let dictionary
  try {
    dictionary =  await mapper.get(dictionaryModel)
  } catch (error) {
    throw new ResponseError(ResponseError.NOT_EXIST, `Dictionary "${id}" does not exist`)
  }

  dictionary = Object.assign(dictionary, {
    slug,
    name: removeSpaces(name),
    isFlat,
    isOpen,
    placeholderRule: removeSpaces(placeholderRule),
  })

  return await mapper.update(dictionary)
}
