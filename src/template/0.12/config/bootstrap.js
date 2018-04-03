/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
const eureka = require('@ytx/futures-eureka-client')
const { utils } = require('@ytx/node-common-tool')
// const Redis = require('ioredis')
const ApiErr = require('../api/utils/apiErr')

module.exports.bootstrap = function (cb) {
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  const { services: { eureakServices }, port } = sails.config
  if (eureakServices && process.env.START_FROM !== 'test') {
    eureka.start(`spinach-core-${process.env.NODE_ENV}`, port, eureakServices)
  }
  global.ApiErr = ApiErr
  global.logger = utils.logger()
  // sails.redis = new Redis(sails.config.connections.redis)
  cb()
}
