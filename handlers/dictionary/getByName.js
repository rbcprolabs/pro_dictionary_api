import {
  success,
  failure,
} from 'utils/response'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'
import getByName from 'api/dictionary/getByName'
import InstanceofSwith from 'utils/instanceof-switch'

export default async function (event, _context, callback) {
  try {
    const result = await getByName(event.pathParameters.name)
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
