import response from 'utils/response'
import Joi from 'joi'
import { update as updateSchema } from 'schema/dictionary'
import updateById from 'api/dictionary/updateById'

export default async function (event, _context, callback) {
  try {
    const data = JSON.parse(event.body)

    // validarte request by schema
    const validData = await Joi.validate(data, updateSchema)

    if (!validData.isFlat && 'isOpen' in validData)
      delete validData.isOpen

    await updateById(event.pathParameters.id, validData)
    callback(null, response({
      status: true,
    }))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
  }
}
