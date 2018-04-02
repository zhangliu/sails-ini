const fs = require('fs')
const _ = require('lodash')
const colors = require('colors')

const packageStr = fs.readFileSync('./package.json')
const packageInfo = JSON.parse(packageStr || '')

const sailsVersion = _.get(packageInfo, 'dependencies.sails')
if (!sailsVersion) {
  console.log(colors.red('[error]: please run in a sails project folder'))
  process.exit()
}

console.log(`获取到sails版本信息：${sailsVersion}`)

if (/^[^\d]*1\..*/.test(sailsVersion)) { // 1.0 版本
  process.exit()
}

// 0.12版本
fs.readFileSync(`${__dirname}/`)
