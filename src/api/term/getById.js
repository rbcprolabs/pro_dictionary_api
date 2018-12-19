import TermModel from 'model/term'
import mapper from 'utils/mapper'
import ResponseError from 'utils/response-error'

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
    throw new ResponseError(ResponseError.NOT_EXIST, `Term "${id}" does not exist`)
  }
}
