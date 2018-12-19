import response from 'utils/response'
import getByName from 'api/dictionary/getByName'

export default async function (event, _context, callback) {
  try {
    const result = await getByName(decodeURI(event.pathParameters.name))
    callback(null, response(result))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
