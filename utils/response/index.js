export function success(body, statusCode = 200) {
  return buildResponse(statusCode, body)
}

export function failure(body, statusCode = 500) {
  return buildResponse(statusCode, body)
}

function buildResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  }
}
