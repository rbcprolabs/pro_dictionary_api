import {
  success,
  failure,
} from 'utils/response'
import {
  removeSpaces,
  dynamoDBCall,
  makeBatchWriteRequest,
} from 'utils'

/**
 * @param {string} slug
 */
async function getDictionaryBySlug(slug) {
  return (await dynamoDBCall('get', {
    TableName: process.env.dictionaryTableName,
    Key: {
      slug,
    },
  })).Item
}

/**
 * Put one item
 * @param {string} term
 * @param {string} dictionary
 * @param {string} fullTerm
 */
async function put(term, dictionary, fullTerm) {
  const
    item = {
      term: removeSpaces(term),
      dictionary,
      fullTerm: `${fullTerm}/${item.term}`,
    },
    params = {
      TableName: process.env.dictionaryTableName,
      Item: item,
    }

  await dynamoDBCall('put', params)
  return item
}

/**
 * Put items list
 * @param {any[]} items
 * @param {string} dictionary
 * @param {string} fullTerm
 */
async function putList(items, dictionary, fullTerm) {
  const {
    result,
    params,
  } = makeBatchWriteRequest({
    tableName: process.env.termsTableName,
    items,
    callback: ({
      term,
    }) => ({
      term: removeSpaces(term),
      dictionary,
      fullTerm: `${fullTerm}/${term}`,
    })
  })

  await dynamoDBCall('batchWrite', params)
  return result
}

export default async function (event, _context, callback) {
  const
    data = JSON.parse(event.body),
    dictionary = await getDictionaryBySlug(data.dictionary)

  if (!dictionary) return callback(null, failure({
    status: false,
    message: `Dictionary "${data.dictionary}" does not exist`,
  }, 404))

  let fullTerm = data.fullTerm || dictionary.name

  try {
    const result = await (('items' in data && data.items instanceof Array)
      ? putList(data.items, dictionary.slug, fullTerm)
      : put(data.term, dictionary.slug, fullTerm))

    callback(null, success(result))
  } catch (error) {
    console.error(error)
    callback(null, failure({
      status: false,
    }))
  }
}
