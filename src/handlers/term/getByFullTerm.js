import response from 'utils/response'
import getByFullTerm from 'api/term/getByFullTerm'

export default async function (event, _context, callback) {
  try {
    const result = await getByFullTerm(decodeURIComponent(event.pathParameters.fullTerm))
    callback(null, response(result))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
