import TermModel from 'model/term'
import mapper from 'utils/mapper'
import { AttributePath } from '@aws/dynamodb-expressions/build/AttributePath'

/**
 * @param {string} parent
 * @param {number} limit
 * @param {string} lastEvaluatedKey id
 */
export default async function getAllByParent(parent, limit, lastEvaluatedKey) {
  const
    items = [],
    scan = mapper.scan(
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

  for await (const item of scan) {
    if (item.childrens)
      item.childrens = Array.from(item.childrens)

    if (item.synonyms)
      item.synonyms = Array.from(item.synonyms)

    items.push(item)
  }

  return {
    items,
    count: scan.count,
    lastEvaluatedKey: scan.lastEvaluatedKey && scan.lastEvaluatedKey.id,
  }
}
