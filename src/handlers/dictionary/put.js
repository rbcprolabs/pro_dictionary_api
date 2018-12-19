import response from 'utils/response'
import Joi from 'joi'
import { put as putSchema } from 'schema/dictionary'
import put from 'api/dictionary/put'

export default async function (event, _context, callback) {
  try {
    const data = JSON.parse(event.body)

    // validarte request by schema
    const validData = await Joi.validate(data, putSchema)

    const result = await put(validData)
    callback(null, response(result))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
