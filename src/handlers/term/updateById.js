import response from 'utils/response'
import Joi from 'joi'
import { update as updateSchema } from 'schema/term'
import updateById from 'api/term/updateById'

export default async function (event, _context, callback) {
  try {
    const data = JSON.parse(event.body)

    // validarte request by schema
    const validData = await Joi.validate(data, updateSchema)

    const result = await updateById(event.pathParameters.id, validData)
    callback(null, response(result.normalized))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
