import TermModel from 'model/term'
import mapper from 'utils/mapper'
import { AttributePath } from '@aws/dynamodb-expressions/build/AttributePath'

/**
 * @param {string} parent
 * @param {number} limit
 * @param {string} lastEvaluatedKey id
 */
export default async function getAllByParent(parent, limit, lastEvaluatedKey) {
  let items = []
  const scan = mapper.scan(
    TermModel,
    {
      filter: {
        type: 'Equals',
        subject: new AttributePath('parent'),
        object: parent,
      },
      limit,
      startKey: lastEvaluatedKey && { id: lastEvaluatedKey }
    }
  ).pages()

  for await (const chunk of scan)
    if (chunk.length > 0)
      items = items.concat(chunk)

  return {
    items: items.map((item) => item.normalized),
    count: scan.count,
    lastEvaluatedKey: scan.lastEvaluatedKey && scan.lastEvaluatedKey.id,
  }
}
