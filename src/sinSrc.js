const fs = require('fs')
const _ = require('lodash')
const colors = require('colors')

if (!fs.existsSync('./package.json')) {
  console.log(colors.yellow('[warning]: please run in a sails project folder'))
  process.exit()
}

const packageStr = fs.readFileSync('./package.json')
const packageInfo = JSON.parse(packageStr)

const sailsVersion = _.get(packageInfo, 'dependencies.sails', null)
if (/^[^\d]*1\..*/.test(sailsVersion)) { // 1.0 版本
  process.exit()
}

// 0.12版本
console.log(sailsVersion, '---------------')
