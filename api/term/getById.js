import TermModel from 'model/term'
import mapper from 'utils/mapper'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {string} id
 */
export default async function getById(id) {
  const termModel = Object.assign(new TermModel, {
    id,
  })

  try {
    const term = await mapper.get(termModel)

    return term.normalized
  } catch (error) {
    throw new CustomError(ERROR.NOT_EXIST, `Term "${id}" does not exist`)
  }
}
