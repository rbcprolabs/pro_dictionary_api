import response from 'utils/response'
import findAll from 'api/term/findAll'

export default async function(event, _context, callback) {
  try {
    const
      term = decodeURIComponent(event.pathParameters.term),
      {
        limit = 20,
        lastEvaluatedKey,
      } = event.queryStringParameters || {}

    const result = await findAll(term, limit, lastEvaluatedKey)
    callback(null, response(result))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
