#!/usr/bin/env node

process.title = 'sin'

const program = require('commander')

program
  .version(require('../package').version)
  .usage('<command> [options]')
  // .option('')
  .parse(process.argv)

require('../src/sinSrc')
