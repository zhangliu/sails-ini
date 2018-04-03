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
const path = `${__dirname}/template/0.12`
const files = readDirSync(path)
files.forEach((file) => {
  const destFile = file.replace(path, process.cwd())
  fs.copyFileSync(file, destFile)
})

function readDirSync (path) {
  let result = []
  const files = fs.readdirSync(path)
  files.forEach(function (file, index) {
    const filePath = `${path}/${file}`
    const info = fs.statSync(filePath)
    if (info.isDirectory()) {
      // console.log(`dir: ${filePath}`)
      result = result.concat(readDirSync(path + '/' + file))
    } else {
      // console.log(`file: ${filePath}`)
      result.push(filePath)
    }
  })
  return result
}
