import response from 'utils/response'
import getBySlug from 'api/dictionary/getBySlug'

export default async function (event, _context, callback) {
  try {
    const result = await getBySlug(decodeURI(event.pathParameters.slug))
    callback(null, response(result))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
