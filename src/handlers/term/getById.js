import response from 'utils/response'
import getById from 'api/term/getById'

export default async function (event, _context, callback) {
  try {
    const result = await getById(decodeURIComponent(event.pathParameters.id))
    callback(null, response(result.normalized))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
