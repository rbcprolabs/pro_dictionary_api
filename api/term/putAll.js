import dynamoDBCall from 'utils/dynamodb-call'
import makeBatchWriteRequest from 'utils/batch-request'
import removeSpaces from 'utils/remove-spaces'
import uuid from 'uuid/v1'

/**
 * Put one item
 * @param {Array} data.terms
 * @param {string} data.dictionary
 * @param {string} data.fullTermParent
 */
export default async function putAll({ terms, dictionary, parent }) {
  const {
    result,
    params,
  } = makeBatchWriteRequest({
    tableName: process.env.termTableName,
    terms,
    callback: ({ term }) => {
      term = removeSpaces(term)
      return {
        id: uuid(),
        dictionary,
        term,
        parent,
        fullTerm: `${parent}/${term}`,
      }
    }
  })

  await dynamoDBCall('batchWrite', params)
  return result
}
