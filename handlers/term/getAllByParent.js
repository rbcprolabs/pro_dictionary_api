import {
  success,
  failure,
} from 'utils/response'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'
import InstanceofSwith from 'utils/instanceof-switch'
import getAllByParent from 'api/term/getAllByParent'

export default async function (event, _context, callback) {
  try {
    const
      parent = decodeURIComponent(event.pathParameters.parent),
      {
        limit = 20,
        lastEvaluatedKey,
      } = event.queryStringParameters

    const result = await getAllByParent(parent, limit, lastEvaluatedKey)
    callback(null, success(result))
  } catch (error) {
    new InstanceofSwith(error)
      .case(CustomError, () =>
        callback(null, failure({
          status: false,
          message: error.message,
        }, ERROR[error.name].statusCode))
      )
      .default(() => {
        console.error(error)
        callback(null, failure({
          status: false,
          error: error.message
        }))
      })
  }
}
