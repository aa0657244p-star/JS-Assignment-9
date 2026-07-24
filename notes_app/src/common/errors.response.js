module.exports = (res, statusCode, message, details = null) => {
  var response = { message };
  if (details) response.details = details;
  return res.status(statusCode).json(response);
};