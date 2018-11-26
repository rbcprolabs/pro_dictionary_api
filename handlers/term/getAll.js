import {
  success,
  failure,
} from 'utils/response'
import getAllByParent from 'api/term/getAllByParent'

export default async function (event, _context, callback) {
  const {
      parent,
      limit = 20,
      lastEvaluatedKey,
    } = event.queryStringParameters,

  try {
    const result = await getAllByParent(parent, limit, lastEvaluatedKey)
    callback(null, success(result))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false,
    }))
  }
}
