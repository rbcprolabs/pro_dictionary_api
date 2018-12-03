import TermModel from 'model/term'
import mapper from 'utils/mapper'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {string} name
 */
export default async function getByFullTerm(fullTerm) {
  let termModel
  for await (const item of mapper.scan(TermModel))
    if (item.fullTerm === fullTerm) return termModel = item

  if (!termModel)
    throw new CustomError(ERROR.NOT_EXIST, `Term "${fullTerm}" does not exist`)

  return termModel
}
