import {
  success,
  failure,
} from 'utils/response'
import {
  removeSpaces,
  dynamoDBCall,
  makeBatchWriteRequest,
} from 'utils'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

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
 * @param {string} term
 * @param {string} parent
 */
async function getTerm(term, parent) {
  return (await dynamoDBCall('get', {
    TableName: process.env.termTableName,
    Key: {
      term,
      parent,
    },
  })).Item
}

async function updateTerm(parent, term, children) {
  const params = {
    TableName: process.env.termTableName,
    Key: {
      parent,
      term,
    },
    UpdateExpression: 'SET children = :children',
    ExpressionAttributeValues: {
      ':children': children,
    },
    ReturnValues: 'ALL_NEW',
  }

  await dynamoDBCall('update', params)
  return true
}

/**
 * Put one item
 * @param {string} term
 * @param {string} dictionary
 * @param {string} fullTermParent
 */
async function put(term, dictionary, parent) {
  const
    item = {
      dictionary,
      term: removeSpaces(term),
      parent,
    },
    params = {
      TableName: process.env.termTableName,
      Item: item,
    }

  await dynamoDBCall('put', params)
  return item
}

/**
 * Put items list
 * @param {any[]} items
 * @param {string} dictionary
 * @param {string} parent
 */
async function putList(items, dictionary, parent) {
  const {
    result,
    params,
  } = makeBatchWriteRequest({
    tableName: process.env.termTableName,
    items,
    callback: ({
      term,
    }) => ({
      dictionary,
      term: removeSpaces(term),
      parent,
    })
  })

  await dynamoDBCall('batchWrite', params)
  return result
}

function checkDictionary(dictionary) {
  if (!dictionary) throw new CustomError(ERROR.NOT_EXIST, `Dictionary "${data.dictionary}" does not exist`)

  if (!dictionary.isOpen) throw new CustomError(ERROR.NOT_ACCEPTABLE, 'Dictionary is closed')
}

export default async function (event, _context, callback) {
  const
    data = JSON.parse(event.body),
    dictionary = await getDictionaryBySlug(data.dictionary)

  try {
    checkDictionary(dictionary)

    const result = await ((!!data.parent && !!data.term && typeof data.parent === 'string' && typeof data.term === 'string')
      ? addToChild(data, dictionary.slug, data.parent, data.term)
      : add(data, dictionary.slug, dictionary.name))

    callback(null, success(result))
  } catch (error) {
    if (error instanceof CustomError) {
      callback(null, failure({
        status: false,
        message: error.message,
      }, ERROR[error.name].statusCode))
    } else {
      console.error(error)
      callback(null, failure({
        status: false,
      }))
    }
  }
}

async function addToChild(data, dictionary, parent, term) {
  const parentTerm = await getTerm(term, parent)

  if (!parentTerm) throw new CustomError(ERROR.NOT_EXIST, `Term "${term}" does not exist`)

  const childrens = ('items' in data && data.items instanceof Array)
    ? data.items.map((item) => item.term)
    : data.term

  const [result] = await Promise.all([
    add(data, dictionary, `${parent}/${term}`),
    updateTerm(parent, term, childrens),
  ])

  return result
}

function add(data, dictionary, parent) {
  const result = ('items' in data && data.items instanceof Array)
    ? putList(data.items, dictionary, parent)
    : put(data.term, dictionary, parent)

  return result
}
