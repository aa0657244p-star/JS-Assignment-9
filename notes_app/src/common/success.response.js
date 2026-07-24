module.exports = (res, statusCode = 200, data = null, message = 'Success') => {
  const response = { message };
  if (data) response.data = data;
  return res.status(statusCode).json(response);
};