import response from 'utils/response'
import getById from 'api/dictionary/getById'

export default async function (event, _context, callback) {
  try {
    const result = await getById(decodeURI(event.pathParameters.id))
    callback(null, response(result))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
