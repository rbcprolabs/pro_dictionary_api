import TermModel from 'model/term'
import mapper from 'utils/mapper'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

/**
 * @param {string} parent
 * @param {number} limit
 * @param {string} lastEvaluatedKey id
 */
export default async function getAllByParent(parent, limit, lastEvaluatedKey) {
  const
    terms = [],
    scan = mapper.scan(TermModel, { startKey: lastEvaluatedKey && { id: lastEvaluatedKey } })
  let nextLastEvaluatedKey

  for await (const item of scan) {
    if (item.parent !== parent)
      continue

    if (item.childrens)
      item.childrens = Array.from(item.childrens)

    if (item.synonyms)
      item.synonyms = Array.from(item.synonyms)

    terms.push(item)

    if (terms.length === limit)
      return
  }

  if (terms.length === 0)
    throw new CustomError(ERROR.NOT_EXIST, `Terms does not exists`)

  return {
    items: terms,
    count: terms.length,
    lastEvaluatedKey: nextLastEvaluatedKey && nextLastEvaluatedKey,
  }
}
