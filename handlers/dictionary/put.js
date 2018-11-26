import {
  success,
  failure,
} from 'utils/response'
import {
  CODE as ERROR,
} from 'utils/custom-error'
import fieldsSchema, { SchemaError } from 'utils/fields-schema'
import schema from 'schema/dictionary'
import InstanceofSwith from 'utils/instanceof-switch'
import put from 'api/dictionary/put'

export default async function (event, _context, callback) {
  try {
    const data = JSON.parse(event.body)

    // validarte request by schema
    await fieldsSchema(schema, data)

    const result = await put(data)
    callback(null, success(result))
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
        }))
      })
  }
}
