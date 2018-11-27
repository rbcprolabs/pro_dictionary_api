import {
  success,
  failure,
} from 'utils/response'
import {
  CODE as ERROR,
} from 'utils/custom-error'
import fieldsSchema, { SchemaError } from 'utils/fields-schema'
import { updateSchema } from 'schema/dictionary'
import InstanceofSwith from 'utils/instanceof-switch'
import updateById from 'api/dictionary/updateById'

export default async function (event, _context, callback) {
  try {
    const data = JSON.parse(event.body)

    // validarte request by schema
    await fieldsSchema(updateSchema, data)

    await updateById(event.pathParameters.id, data)
    callback(null, success({
      status: true,
    }))
  } catch (error) {
    new InstanceofSwith(error)
      .case(SchemaError, () =>
        callback(null, failure({
          status: false,
          message: error.message
        }, ERROR.NOT_ACCEPTABLE.statusCode))
      )
      .default(() => {
        console.error(error)
        callback(null, failure({
          status: false,
          error: error.message
        }))
      })
  }
}
