import TermModel from 'model/term'
import mapper from 'utils/mapper'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {string} id
 * @param {Array} data.term
 * @param {string} data.dictionaryId
 * @param {string} data.parent
 * @param {string} data.fullTerm
 * @param {string[]} data.childrens
 */
export default async function updateById(id, { term, dictionaryId, parent, fullTerm, childrens }) {
  const termModel = Object.assign(new TermModel, {
    id,
  })

  let newTermModel
  try {
    newTermModel = await mapper.get(termModel)
  } catch (error) {
    throw new CustomError(ERROR.NOT_EXIST, `Term "${term}" does not exist`)
  }

  newTermModel = Object.assign(newTermModel, {
    term,
    dictionaryId,
    parent,
    fullTerm,
    childrens,
  })

  return await mapper.update(newTermModel)
}
