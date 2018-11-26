import uuid from 'uuid/v1'
import {
  success,
  failure,
} from 'utils/response'
import {
  removeSpaces,
  dynamoDBCall,
} from 'utils'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'

const schema = {
  name: {
    type: String,
    pattern: /^[а-яА-Я ]+$/g,
    length: {
      min: 2,
      max: 100,
    },
  },
  slug: {
    type: String,
    pattern: /^[a-z_]+$/g,
    length: {
      min: 2,
      max: 100,
    },
  },
  isFlat: {
    type: Boolean,
  },
  isOpen: {
    type: Boolean,
  },
}

export default async function (event, _context, callback) {
  let data, name, slug, isFlat, isOpen
  try {
    data = JSON.parse(event.body)

    if (!('name' in data)) {
      throw new CustomError(ERROR.NOT_EXIST, `Field "name" can not be exist`)
    }
  } catch (error) {
    callback(null, failure({
      status: false,
    }))
  }
  const params = {
    TableName: process.env.dictionaryTableName,
    Item: {
      id: uuid(),
      slug,
      name: removeSpaces(name),
      isFlat,
      isOpen,
    },
  }

  if (!(/^[a-z_]+$/g.test(slug)))
    throw new CustomError(ERROR.NOT_ACCEPTABLE, `Slug does not match pattern "/^[a-z_]+$/g"`)

  try {
    await dynamoDBCall('put', params)
    callback(null, success(params.Item))
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
