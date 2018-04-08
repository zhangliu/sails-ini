module.exports = function ok (data) {
  var res = this.res
  // const result = {code: SUCCESS.CODE, errorMessage: 'ok', data}
  sails.log.verbose('Ran custom response: res.ok()')
  res.status(200).send(data)
}
