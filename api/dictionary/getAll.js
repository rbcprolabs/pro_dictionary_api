import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'

/**
 * @param {number} limit
 * @param {string} lastEvaluatedKey id
 */
export default async function getAll(limit, lastEvaluatedKey) {
  let items = []
  const scan = mapper.scan(
    DictionaryModel,
    {
      limit,
      startKey: lastEvaluatedKey && { id: lastEvaluatedKey } ,
    }
  ).pages()

  for await (const chunk of scan)
    if (chunk.length > 0)
      items = items.concat(chunk)

  return {
    items,
    count: scan.count,
    lastEvaluatedKey: scan.lastEvaluatedKey && scan.lastEvaluatedKey.id,
  }
}
