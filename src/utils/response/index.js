/**
 * @param {Object|Array} body
 * @param {number} statusCode
 */
export default function response(body, statusCode) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  }
}
