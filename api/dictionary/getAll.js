import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {number} limit
 * @param {string} lastEvaluatedKey id
 */
export default async function getAll(limit, lastEvaluatedKey) {
  const
    dictionaries = []
    scan = mapper.scan(DictionaryModel, { limit, startKey: lastEvaluatedKey && { id: lastEvaluatedKey } })
  let nextLastEvaluatedKey

  for await (const item of scan)
    dictionaries.push(item)

  if (dictionaries.length = 0)
    throw new CustomError(ERROR.NOT_EXIST, `Dictionaries does not exists`)

  return {
    items: dictionaries,
    count: dictionaries.length,
    lastEvaluatedKey: nextLastEvaluatedKey && nextLastEvaluatedKey,
  }
}
