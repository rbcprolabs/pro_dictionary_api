import TermModel from 'model/term'
import mapper from 'utils/mapper'
import removeSpaces from 'utils/remove-spaces'

/**
 * Put one item
 * @param {{terms:string[],dictionaryId:string,parent:string}} data
 */
export default async function putAll({ terms, dictionaryId, parent }) {
  const termModels = terms.map((term) => {
    term = term.term::removeSpaces()
    return Object.assign(new TermModel, {
      dictionaryId,
      term,
      parent,
      fullTerm: `${parent}/${term}`,
      termLowCase: term.toLowerCase(),
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
