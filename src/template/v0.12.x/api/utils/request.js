const request = require('request-promise-native')

module.exports = {
  async post (url, options) {
    const opt = Object.assign({ json: true }, options, { method: 'post', url })
    const res = await request(opt)
    return res
  },

  async get (url, options = {}) {
    const opt = Object.assign(options, { method: 'get', url })
    const res = await request(opt)
    return res
  },

  async put (url, options = {}) {
    const opt = Object.assign({ json: true }, options, { method: 'put', url })
    const res = await request(opt)
    return res
  }
}
