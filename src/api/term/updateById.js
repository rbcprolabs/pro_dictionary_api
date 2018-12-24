import TermModel from 'model/term'
import mapper from 'utils/mapper'
import ResponseError from 'utils/response-error'
import removeSpaces from 'utils/remove-spaces'

/**
 * @param {string} id
 * @param {{term:string,childrens:string[],synonyms:string[]}} data
 */
export default async function updateById(id, { term, childrens, synonyms }) {
  const termModel = Object.assign(new TermModel, {
    id,
  })

  let newTermModel
  try {
    newTermModel = await mapper.get(termModel)
  } catch (error) {
    throw new ResponseError(ResponseError.NOT_EXIST, `Term "${term}" does not exist`)
  }

  term = term::removeSpaces()

  newTermModel = Object.assign(newTermModel, {
    term,
    childrens,
    synonyms,
    fullTerm: `${newTermModel.parent}/${term}`,
    termLowCase: term.toLowerCase(),
  })

  const result = await mapper.update(newTermModel)
  return result.normalized
}
