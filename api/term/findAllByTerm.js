import TermModel from 'model/term'
import mapper from 'utils/mapper'
import {
  AttributePath,
  FunctionExpression,
} from '@aws/dynamodb-expressions'

/**
 * @param {string} dictionaryId
 * @param {string} term
 * @param {number} limit
 * @param {string} lastEvaluatedKey
 */
export default async function findByTerm(dictionaryId, term, limit, lastEvaluatedKey) {
  const
    items = [],
    scan = mapper.scan(
      TermModel,
      {
        filter: {
          type: 'And',
          conditions: [{
            type: 'Equals',
            subject: new AttributePath('dictionaryId'),
            object: dictionaryId,
          },new FunctionExpression(
            'contains',
            new AttributePath('synonyms'),
            term.toLowerCase(),
          )],
        },
        limit,
        startKey: lastEvaluatedKey && { id: lastEvaluatedKey },
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
