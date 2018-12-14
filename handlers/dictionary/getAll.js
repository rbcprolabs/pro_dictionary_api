import {
  success,
  failure,
} from 'utils/response'
import getAll from 'api/dictionary/getAll'

export default async function (event, _context, callback) {
  try {
    const {
      limit = 5,
      lastEvaluatedKey,
    } = event.queryStringParameters || {}

    const result = await getAll(limit, lastEvaluatedKey)
    callback(null, success(result))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false,
    }))
  }
}
