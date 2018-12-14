import {
  success,
  failure,
} from 'utils/response'
import findAllByTerm from 'api/term/findAllByTerm'

export default async function(event, _context, callback) {
  try {
    const
      dictionaryId = decodeURIComponent(event.pathParameters.dictionaryId),
      term = decodeURIComponent(event.pathParameters.term),
      {
        limit = 20,
        lastEvaluatedKey,
      } = event.queryStringParameters || {}

    const result = await findAllByTerm(dictionaryId, term, limit, lastEvaluatedKey)
    callback(null, success(result))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false,
      error: error.message
    }))
  }
}
