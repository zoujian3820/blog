const { resolve } = require('path')

module.exports = {
  mode: 'production',
  entry: './src/test/index.js',
  output: {
    filename: 'js/test-bundle.js',
    path: resolve(__dirname, 'build')
  }
}
