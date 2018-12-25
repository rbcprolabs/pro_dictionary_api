import TermModel from 'model/term'
import mapper from 'utils/mapper'
import {
  AttributePath,
  FunctionExpression,
} from '@aws/dynamodb-expressions'

/**
 * @param {string} parent
 */
export default async function deleteAllByParent(parent) {
  let
    items = [],
    deletedItems = []
  const scan = mapper.scan(
    TermModel,
    {
      filter: new FunctionExpression(
        'begins_with',
        new AttributePath('parent'),
        parent,
      )
    }
  )

  for await (const item of scan)
    items.push(item)


  for await (const found of mapper.batchDelete(items))
    deletedItems.push(found)

  return deletedItems
}
