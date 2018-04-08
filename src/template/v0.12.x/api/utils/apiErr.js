class ApiErr extends Error {
  constructor (msg, code, httpStatus = 400) {
    super(msg)
    this.code = code
    this.httpStatus = httpStatus
  }
}

module.exports = ApiErr
