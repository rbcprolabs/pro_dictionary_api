import response from 'utils/response'
import findAllByDictionary from 'api/term/findAllByDictionary'

export default async function(event, _context, callback) {
  try {
    const
      dictionaryId = decodeURIComponent(event.pathParameters.dictionaryId),
      term = decodeURIComponent(event.pathParameters.term),
      {
        limit = 20,
        lastEvaluatedKey,
      } = event.queryStringParameters || {}

    const result = await findAllByDictionary(dictionaryId, term, limit, lastEvaluatedKey)
    callback(null, response(result))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
