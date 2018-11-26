import dynamoDBCall from 'utils/dynamodb-call'
import removeSpaces from 'utils/remove-spaces'
import uuid from 'uuid/v1'

/**
 * Put one item
 * @param {string} data.term
 * @param {string} data.dictionary
 * @param {string} data.fullTermParent
 */
export default async function put({ term, dictionary, parent }) {
  term = removeSpaces(term)
  const params = {
    TableName: process.env.termTableName,
    Item: {
      id: uuid(),
      dictionary,
      term,
      parent,
      fullTerm: `${parent}/${term}`,
    },
  }

  await dynamoDBCall('put', params)
  return params.Item
}
