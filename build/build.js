// https://github.com/shelljs/shelljs
// require('./check-versions')()

process.env.NODE_ENV = 'production'

let path = require('path')
let shell = require('shelljs')
let config = require('../config')
let ora = require('ora')
let chalk = require('chalk')
let webpack = require('webpack')
let webpackConfig = require('./webpack.prod.conf')
let spinner = ora('building for production...')
spinner.start()

// let assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// shell.rm('-rf', assetsPath)
// shell.mkdir('-p', assetsPath)
// shell.config.silent = true
// shell.cp('-R', 'static/*', assetsPath)
// shell.config.silent = false

webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n'
  )

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(
    chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
        "  Opening index.html over file:// won't work.\n"
    )
  )
})
