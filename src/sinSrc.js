const fs = require('fs')
const colors = require('colors')

if (!fs.existsSync('./package.jsons')) {
  console.log(colors.yellow('[warning]: please run in a sails project folder'))
}
