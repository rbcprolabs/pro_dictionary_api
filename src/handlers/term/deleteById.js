import response from 'utils/response'
import deleteById from 'api/term/deleteById'

export default async function (event, _context, callback) {
  try {
    await deleteById(decodeURI(event.pathParameters.id))
    callback(null, response({
      status: true,
    }))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
