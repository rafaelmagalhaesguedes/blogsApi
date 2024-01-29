/* 
  This function receives two parameters:
  - message: error message
  - statusCode: status code

  Usage example:
  - throw httpError('Post does not exist', 404);
*/
function httpError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

module.exports = { httpError };
