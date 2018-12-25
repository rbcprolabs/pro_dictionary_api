import mapper from 'utils/mapper'
import removeSpaces from 'utils/remove-spaces'
import getById from 'api/term/getById'

/**
 * @param {string} id
 * @param {{term:string,childrens:string[],synonyms:string[]}} data
 */
export default async function updateById(id, { term, childrens, synonyms }) {
  let termModel = await getById(id)

  term = term::removeSpaces()

  const newTermModel = Object.assign(termModel, {
    term,
    childrens,
    synonyms,
    fullTerm: `${termModel.parent}/${term}`,
    termLowCase: term.toLowerCase(),
  })

  return await mapper.update(newTermModel)
}
