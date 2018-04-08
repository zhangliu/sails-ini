module.exports = function err (error) {
  var res = this.res
  logger.error(error)
  sails.log.verbose('Ran custom response: res.err()')
  const httpStatus = error.httpStatus || 500

  const result = {
    code: error.code || -1,
    errorMessage: httpStatus >= 500 ? '服务器异常，请稍后再试！' : error.message,
    data: null
  }

  res.status(httpStatus).send(result)
}
