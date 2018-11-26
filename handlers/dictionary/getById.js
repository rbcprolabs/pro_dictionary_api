import {
  success,
  failure,
} from 'utils/response'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'
import getById from 'api/dictionary/getById'
import InstanceofSwith from 'utils/instanceof-switch'

export default async function (event, _context, callback) {
  try {
    const result = await getById(event.pathParameters.id)
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
        }))
      })
  }
}
