import TermModel from 'model/term'
import mapper from 'utils/mapper'
import removeSpaces from 'utils/remove-spaces'

/**
 * Put one item
 * @param {{term:string,dictionaryId:string,parent:string}} data
 */
export default async function put({ term, dictionaryId, parent }) {
  term = term::removeSpaces()
  const termModel = Object.assign(new TermModel, {
    dictionaryId,
    term,
    parent,
    fullTerm: `${parent}/${term}`,
    termLowCase: term.toLowerCase(),
  })

  return await mapper.put(termModel)
}
