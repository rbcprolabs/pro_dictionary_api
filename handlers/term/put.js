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
import putAll from 'api/term/putAll'
import getById from 'api/term/getById'
import updateById from 'api/term/updateById'
import schema from 'schema/term'
import fieldsSchema, { SchemaError } from 'utils/fields-schema'

export default async function (event, _context, callback) {
  try {
    const
      data = JSON.parse(event.body),
      dictionary = await getDictionaryById(data.dictionaryId)

    await fieldsSchema(schema, data)

    const result = await ((!!data.parentId)
      ? addToChild(data, dictionary.slug, data.parentId)
      : add(data, dictionary.slug, dictionary.name))

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

async function addToChild(data, dictionarySlug, id) {
  const {
    parent,
    term,
  } = await getById(id)

  const childrens = ('terms' in data && data.terms instanceof Array)
    ? data.terms.map((item) => item.term)
    : data.term

  const [result] = await Promise.all([
    add(data, dictionarySlug, `${parent}/${term}`),
    updateById(id, {childrens}),
  ])

  return result
}

const add = (data, dictionarySlug, parent) =>
  ('terms' in data && data.terms instanceof Array)
    ? putAll({
        terms: data.terms,
        dictionary: dictionarySlug,
        parent,
      })
    : put({
        term: data.term,
        dictionary: dictionarySlug,
        parent,
      })
