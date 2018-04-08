const fs = require('fs')
const _ = require('lodash')
const colors = require('colors')
let handler

if (!fs.existsSync('./package.json')) {
  console.log(colors.red('[error]: please run in a sails project folder'))
  process.exit()
}
const packageStr = fs.readFileSync('./package.json')
const packageInfo = JSON.parse(packageStr || '')

const sailsVersion = _.get(packageInfo, 'dependencies.sails')
if (!sailsVersion) {
  console.log(colors.red('[error]: can not get a sails version'))
  process.exit()
}

console.log(colors.cyan(`获取到sails版本信息：${sailsVersion}`))

if (/^[^\d]*1\..*/.test(sailsVersion)) { // 1.0 版本
  handler = require('./v1.0.x')
  handler.run(packageInfo)
  process.exit()
}

// 0.12版本
handler = require('./v0.12.x')
handler.run(packageInfo)
