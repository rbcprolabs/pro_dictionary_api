import {
  success,
  failure,
} from 'utils/response'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'
import InstanceofSwith from 'utils/instanceof-switch'
import getDictionaryById from 'api/dictionary/getById'
import put from 'api/term/put'
import getById from 'api/term/getById'
import updateById from 'api/term/updateById'
import { put as putSchema } from 'schema/term'
import fieldsSchema, { SchemaError } from 'utils/fields-schema'

export default async function (event, _context, callback) {
  try {
    const
      data = JSON.parse(event.body),
      dictionary = await getDictionaryById(data.dictionaryId)

    await fieldsSchema(putSchema, data)

    const result = await ((!!data.parentId)
      ? addToChild(data.term, dictionary.id, data.parentId)
      : add(data.term, dictionary.id, dictionary.name))

    callback(null, success(result))
  } catch (error) {
    new InstanceofSwith(error)
      .case(CustomError, () =>
        callback(null, failure({
          status: false,
          message: error.message,
        }, ERROR[error.name].statusCode))
      )
      .case(SchemaError, () =>
        callback(null, failure({
          status: false,
          message: error.message,
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

async function addToChild(term, dictionaryId, parentId) {
  const parentTerm = await getById(parentId)

  parentTerm.childrens = (parentTerm.childrens)
    ? new Set([...parentTerm.childrens, term])
    : new Set([term])

  const [result] = await Promise.all([
    add(term, dictionaryId, parentTerm.fullTerm),
    updateById(parentId, parentTerm),
  ])

  return result
}

const add = (term, dictionaryId, parent) =>
  put({
    term,
    dictionaryId,
    parent,
  })
