
const fs = require('fs')
const path = require('path')
const cprocess = require('child_process')
const colors = require('colors')

const {readDirSync, mkdirSync} = require('./common/handerHelper')

function run (packageInfo) {
  // 拷贝文件
  const fileDir = `${__dirname}/template/v0.12.x`
  const files = readDirSync(fileDir)
  files.forEach((file) => {
    console.log(`开始拷贝文件${path.basename(file)}...`)
    const destFile = file.replace(fileDir, process.cwd())
    const destDir = path.dirname(destFile)
    if (!fs.existsSync(destDir)) mkdirSync(destDir)
    fs.writeFileSync(destFile, fs.readFileSync(file))
  })

  console.log(colors.cyan('开始添加script命令...'))
  // 添加test命令
  packageInfo.scripts.test = 'START_FROM=test node ./node_modules/mocha/bin/mocha -t 20000 tests/lifecycle.test.js'
  packageInfo.scripts.dp = "'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' xxx"
  fs.writeFileSync('./package.json', JSON.stringify(packageInfo))

  console.log(colors.cyan('开始安装必要的命令...'))
  // 执行必要的库安装命令
  console.log(colors.cyan('安装eureka...'))
  cprocess.execSync('npm i @ytx/futures-eureka-client')
  cprocess.execSync('npm i @ytx/node-common-tool')
  console.log(colors.cyan('安装test工具...'))
  cprocess.execSync('npm i supertest')
  cprocess.execSync('npm i chai')
  cprocess.execSync('npm i sinon')
  console.log(colors.cyan('安装eslint配置...'))
  const cmd = 'export PKG=eslint-config-airbnb; npm info "$PKG@latest" peerDependencies --json | command sed "s/[\{\},]//g ; s/: /@/g" | xargs npm install --save-dev "$PKG@latest"'
  cprocess.execSync(cmd)
  console.log(colors.green('success, all jobs has done!'))
}

module.exports = {run}
