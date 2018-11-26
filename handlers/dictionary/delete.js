import {
  success,
  failure,
} from 'utils/response'
import deleteById from 'api/dictionary/deleteById'

export default async function (event, _context, callback) {
  try {
    await deleteById(event.pathParameters.id)
    callback(null, success({
      status: true,
    }))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false,
    }))
  }
}
