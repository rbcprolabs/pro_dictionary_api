import TermModel from 'model/term'
import mapper from 'utils/mapper'
import ResponseError from 'utils/response-error'
import { AttributePath } from '@aws/dynamodb-expressions/build/AttributePath'

/**
 * @param {string} name
 */
export default async function getByFullTerm(fullTerm) {
  let term
  const scan = mapper.scan(TermModel, {
    filter: {
      type: 'Equals',
      subject: new AttributePath('fullTerm'),
      object: fullTerm,
    },
  })
  for await (const item of scan)
    term = item.normalized

  if (!term)
    throw new ResponseError(ResponseError.NOT_EXIST, `Term "${fullTerm}" does not exist`)

  return term
}
