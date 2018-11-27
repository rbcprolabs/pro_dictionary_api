import TermModel from 'model/term'
import mapper from 'utils/mapper'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {string} id
 * @param {string[]} data.children
 */
export default async function updateById(id, { term, dictionary, parent, fullTerm, children }) {
  const termModel = Object.assign(new TermModel, {
    id,
  })

  let newTermModel
  try {
    newTermModel =  await mapper.get(termModel)
  } catch (error) {
    throw new CustomError(ERROR.NOT_EXIST, `Term "${term}" does not exist`)
  }

  newTermModel = Object.assign(newTermModel, {
    term,
    dictionary,
    parent,
    fullTerm,
    children,
  })

  return await mapper.update(newTermModel)
}
