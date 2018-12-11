import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'

/**
 * @param {number} limit
 * @param {string} lastEvaluatedKey id
 */
export default async function getAll(limit, lastEvaluatedKey) {
  const
    items = [],
    scan = mapper.scan(
      DictionaryModel,
      {
        limit,
        startKey: lastEvaluatedKey && { id: lastEvaluatedKey } ,
      }
    ).pages()

  for await (const item of scan)
    items.push(item)

  return {
    items,
    count: scan.count,
    lastEvaluatedKey: scan.lastEvaluatedKey && scan.lastEvaluatedKey.id,
  }
}
