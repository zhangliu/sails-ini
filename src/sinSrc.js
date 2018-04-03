const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const colors = require('colors')
const cprocess = require('child_process')

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

console.log(`获取到sails版本信息：${sailsVersion}`)

if (/^[^\d]*1\..*/.test(sailsVersion)) { // 1.0 版本
  process.exit()
}

// 0.12版本
// 拷贝文件
const fileDir = `${__dirname}/template/0.12`
const files = readDirSync(fileDir)
files.forEach((file) => {
  console.log(`开始拷贝文件${path.basename(file)}...`)
  const destFile = file.replace(fileDir, process.cwd())
  const destDir = path.dirname(destFile)
  if (!fs.existsSync(destDir)) mkdirSync(destDir)
  fs.writeFileSync(destFile, fs.readFileSync(file))
})

console.log('开始添加script命令...')
// 添加test命令
packageInfo.scripts.test = 'START_FROM=test node ./node_modules/mocha/bin/mocha -t 20000 tests/lifecycle.test.js'
packageInfo.scripts.dp = "'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' xxx"
fs.writeFileSync('./package.json', JSON.stringify(packageInfo))

console.log('开始安装必要的命令...')
// 执行必要的库安装命令
cprocess.execSync('npm i @ytx/futures-eureka-client')
cprocess.execSync('npm i @ytx/node-common-tool')
cprocess.execSync('npm i supertest')
cprocess.execSync('npm i chai')
cprocess.execSync('npm i sinon')
console.log(colors.green('success, all jobs has done!'))

function readDirSync (fileDir) {
  let result = []
  const files = fs.readdirSync(fileDir)
  files.forEach(function (file, index) {
    const filePath = `${fileDir}/${file}`
    const info = fs.statSync(filePath)
    if (info.isDirectory()) {
      // console.log(`dir: ${filePath}`)
      result = result.concat(readDirSync(filePath))
    } else {
      // console.log(`file: ${filePath}`)
      result.push(filePath)
    }
  })
  return result
}

function mkdirSync (fileDir) {
  const fatherDir = path.dirname(fileDir)
  if (fs.existsSync(fatherDir)) return fs.mkdirSync(fileDir)
  mkdirSync(fileDir)
}
