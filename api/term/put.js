import TermModel from 'model/term'
import mapper from 'utils/mapper'
import removeSpaces from 'utils/remove-spaces'

/**
 * Put one item
 * @param {string} data.term
 * @param {string} data.dictionaryId
 * @param {string} data.fullTermParent
 */
export default async function put({ term, dictionaryId, parent }) {
  term = removeSpaces(term)
  const termModel = Object.assign(new TermModel, {
    dictionaryId,
    term,
    parent,
    fullTerm: `${parent}/${term}`,
  })

  return await mapper.put(termModel)
}
