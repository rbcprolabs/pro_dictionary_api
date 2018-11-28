import {
  success,
  failure,
} from 'utils/response'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'
import InstanceofSwith from 'utils/instanceof-switch'
import getDictionaryById from 'api/dictionary/getById'
import putAll from 'api/term/putAll'
import getById from 'api/term/getById'
import updateById from 'api/term/updateById'
import schema from 'schema/term'
import fieldsSchema, { SchemaError } from 'utils/fields-schema'
import { Set } from 'core-js';

export default async function (event, _context, callback) {
  try {
    const
      data = JSON.parse(event.body),
      dictionary = await getDictionaryById(data.dictionaryId)

    await fieldsSchema(schema, data)

    const result = await ((!!data.parentId)
      ? addToChild(data.terms, dictionary.id, data.parentId)
      : add(data.terms, dictionary.id, dictionary.name))

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

async function addToChild(terms, dictionaryId, parentId) {
  const
    parentTerm = await getById(parentId),
    childrens = terms.map((item) => item.term)

  parentTerm.childrens = (parentTerm.childrens)
    ? new Set([...parentTerm.childrens, ...childrens])
    : new Set(childrens)

  const [result] = await Promise.all([
    add(terms, dictionaryId, parentTerm.fullTerm),
    updateById(parentId, parentTerm),
  ])

  return result
}

const add = (terms, dictionaryId, parent) =>
  putAll({
    terms,
    dictionaryId,
    parent,
  })
