const fs = require('fs')
const path = require('path')

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

module.exports = {
  readDirSync,
  mkdirSync
}
