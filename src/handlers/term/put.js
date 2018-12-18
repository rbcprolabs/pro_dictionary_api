import response from 'utils/response'
import Joi from 'joi'
import { put as putSchema } from 'schema/term'
import getDictionaryById from 'api/dictionary/getById'
import getById from 'api/term/getById'
import updateById from 'api/term/updateById'
import put from 'api/term/put'

export default async function (event, _context, callback) {
  try {
    const data = JSON.parse(event.body)

    // validarte request by schema
    const validData = await Joi.validate(data, putSchema)

    const dictionary = await getDictionaryById(validData.dictionaryId)

    const result = await ((validData.parentId)
      ? addToChild(validData.term, dictionary.id, validData.parentId)
      : add(validData.term, dictionary.id, dictionary.name))

    callback(null, response(result))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
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
