<!--
 * @Author: mrzou
 * @Date: 2021-07-31 20:20:32
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-31 22:20:22
 * @Description: file content
-->
## install
```bash
npm install -g yarn
npm install -g yrm

yarn add webpack webpack-cli --dev
yarn add css-loader style-loader --dev

yarn add sass node-sass sass-loader scss-loader --dev
yarn add less less-loader --dev

yarn add html-webpack-plugin html-loader file-loader url-loader --dev
```
## 与webpack4差异
- 图片的loader有新的替代，如果仍用旧的url-loader file-loader等要配置 type: 'javascript/auto'
使用旧的图片loader写法
```js
// url-loader + img-loader 可实现图片压缩
// imagemin
// imagemin-gifsicle
// imagemin-mozjpeg
// imagemin-pngquant
// imagemin-svgo
// 参考地址 http://www.manongjc.com/detail/20-iuazpioewmsljpu.html
{
  test: /\.(png|gif|jpg|jpeg)$/,
  loader: 'url-loader',
  // 当在 webpack 5 中使用旧的 assets loader
  // （如 file-loader/url-loader/raw-loader 等）和
  // asset 模块时，你可能想停止当前 asset 模块的处理，
  // 并再次启动处理，这可能会导致 asset 重复，
  // 你可以通过将 asset 模块的类型设置为 'javascript/auto' 来解决。
  type: 'javascript/auto',
  options: {
    limit: 8 * 1024,
    esModule: false,
    name: '[name].[hash:6].[ext]'
  }
}
```
用webpack5.0新的loader方案
```js
{
  // 默认情况下，asset/resource 模块以 [hash][ext][query] 文件名发送到输出目录。
  // 可以通过在 webpack 配置中设置 output.assetModuleFilename 来修改此模板字符串：
  test: /\.(png|gif|jpg|jpeg)$/,
  type: 'asset/resource'
}

output: {
  filename: 'bundle.js',
  path: resolve(__dirname, 'build'),
  assetModuleFilename: 'images/[name].[hash:6][ext][query]'
}
```
