import response from 'utils/response'
import Joi from 'joi'
import { putAll as putAllSchema } from 'schema/term'
import getDictionaryById from 'api/dictionary/getById'
import getById from 'api/term/getById'
import putAll from 'api/term/putAll'
import updateById from 'api/term/updateById'

export default async function (event, _context, callback) {
  try {
    const data = JSON.parse(event.body)

    // validarte request by schema
    const validData = await Joi.validate(data, putAllSchema)

    const dictionary = await getDictionaryById(validData.dictionaryId)

    const result = await ((validData.parentId)
      ? addToChild(validData.terms, dictionary.id, validData.parentId)
      : add(validData.terms, dictionary.id, dictionary.name))

    callback(null, response(result))
  } catch ({ message: error, code = 406 }) {
    callback(null, response({
      status: false,
      error,
    }, code))
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
