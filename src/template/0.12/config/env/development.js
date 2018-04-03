/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
  port: 3000,
  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  connections: {
    MysqlServer: {
      adapter: 'sails-mysql',
      host: '',
      port: 0,
      user: '', // optional
      password: '', // optional
      database: '' // optional
    },
    MysqlServerTest: {
      adapter: 'sails-mysql',
      host: '',
      port: 0,
      user: '', // optional
      password: '', // optional
      database: '' // optional
    },
    redis: {
      host: '',
      port: 0,
      password: ''
    }
  },

  models: {
    connection: 'MysqlServer',
    migrate: 'alter'
  },

  services: {
    eureakServices: [
      'http://eureka-tertiary.local/eureka/apps',
      'http://eureka-secondary.local/eureka/apps',
      'http://eureka-primary.local/eureka/apps'
    ]
  }
}
