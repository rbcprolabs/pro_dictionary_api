import TermModel from 'model/term'
import mapper from 'utils/mapper'
import removeSpaces from 'utils/remove-spaces'

/**
 * Put one item
 * @param {Array} data.terms
 * @param {string} data.dictionaryId
 * @param {string} data.fullTermParent
 */
export default async function putAll({ terms, dictionaryId, parent }) {
  const termModels = terms.map((term) => {
    term = removeSpaces(term.term)
    return Object.assign(new TermModel, {
      dictionaryId,
      term,
      parent,
      fullTerm: `${parent}/${term}`,
    })
  })

  const successfullyAdded = []

  for await (const persisted of mapper.batchPut(termModels))
    successfullyAdded.push(persisted)

  return {
    items: successfullyAdded,
    count: successfullyAdded.length,
    isAllAdded: successfullyAdded.length === termModels.length,
  }
}
