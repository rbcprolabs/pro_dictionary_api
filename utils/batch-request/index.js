/**
 * @callback makeBatchWriteRequestCallback
 * @param {any} value
 * @param {number} index
 * @param {any[]} array
 */

/**
 * Make batch write params for dynamodb query
 * @param {Object} options
 * @param {string} options.tableName
 * @param {any[]} options.items
 * @param {string} options.requestType
 * @param {makeBatchWriteRequestCallback} options.callback
 * @returns {Object} result
 */
export default function makeBatchWriteRequest({
  tableName,
  items,
  requestType = 'PutRequest',
  callback,
} = {}) {
  const {
    result,
    prepared,
  } = items.reduce((previousValue, currentValue, index, array) => {
    const item = !!callback && callback(currentValue, index, array) || currentValue

    previousValue.result.push(item)
    previousValue.prepared.push({
      [requestType]: {
        Item: item,
      },
    })

    return previousValue
  }, {
    result: [],
    prepared: [],
  })

  return {
    result,
    params: {
      RequestItems: {
        [tableName]: prepared,
      },
    },
  }
}
