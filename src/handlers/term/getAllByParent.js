import response from 'utils/response'
import getAllByParent from 'api/term/getAllByParent'

export default async function (event, _context, callback) {
  try {
    const
      parent = decodeURIComponent(event.pathParameters.parent),
      {
        limit = 20,
        lastEvaluatedKey,
      } = event.queryStringParameters || {}

    const result = await getAllByParent(parent, limit, lastEvaluatedKey)
    callback(null, response(result))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
