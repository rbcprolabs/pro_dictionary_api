import {
  success,
  failure,
} from 'utils/response'
import deleteById from 'api/dictionary/deleteById'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'
import InstanceofSwith from 'utils/instanceof-switch'

export default async function (event, _context, callback) {
  try {
    await deleteById(decodeURI(event.pathParameters.id))
    callback(null, success({
      status: true,
    }))
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
