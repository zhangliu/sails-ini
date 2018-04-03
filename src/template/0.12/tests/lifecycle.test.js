var sails = require('sails')
const supertest = require('supertest')
const chai = require('chai')
const sinon = require('sinon')
const mockToken = require('./fixtures/MockToken')
chai.should()
global.mockModels = require('./fixtures/MockModels')

// Before running any tests...
before (function (done) {
  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(20000)

  sails.lift({
    // Your sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    // configuration for testing purposes
    models: {
      connection: 'MysqlServerCi',
      migrate: 'safe'
    },
    hooks: { grunt: false },
    log: { level: 'warn' },
    port: 3001
  }, async function (err) {
    if (err) { return done(err) }

    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)
    const request = supertest(sails.hooks.http.app)
    global.request = request
    global.expect = chai.expect
    global.sinon = sinon
    global.user = await mockToken()
    global.userToken = global.user.token
    // 统一mock调错误日志打印,并添加到全局，以便作为spy使用
    global.logError = sinon.stub(sails.log, 'error').callsFake(() => { })

    done(err, sails)
  })
})

// After all tests have finished...
after (function (done) {
  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done)
})
