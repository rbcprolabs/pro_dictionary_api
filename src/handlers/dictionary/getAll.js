import response from 'utils/response'
import getAll from 'api/dictionary/getAll'

export default async function (event, _context, callback) {
  try {
    const {
      limit = 5,
      lastEvaluatedKey,
    } = event.queryStringParameters || {}

    const result = await getAll(limit, lastEvaluatedKey)
    callback(null, response(result))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
