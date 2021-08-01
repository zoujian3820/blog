<!--
 * @Author: mrzou
 * @Date: 2021-07-31 20:20:32
 * @LastEditors: mrzou
 * @LastEditTime: 2021-08-01 19:03:35
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

# 安装提取css成单个文件的插件 mini-css-extract-plugin
# 先前使用style-loader的方式处理，通过js动态插入style标签时 
# 会有闪屏出现 所以提取出来 这样css加载更快 js包也变更小了
yarn add mini-css-extract-plugin --dev
# 添加css兼容处理的 postcss-loader
yarn add postcss-loader --dev
# 添加识别浏览器版本的 postcss-preset-env
yarn add postcss-preset-env --dev
# 添加压缩css的插件 optimize-css-assets-webpack-plugin
yarn add optimize-css-assets-webpack-plugin --dev
# 配置eslint语法检查 eslint默认只支持js 这里使用 airbnb 风格
# eslint-config-airbnb-base 不包含react语法， eslint-config-airbnb则包含
yarn add eslint-loader eslint eslint-config-airbnb-base  eslint-plugin-import --dev
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

## 其他的loader配置
配置postcss-loader
```js
{
  // https://webpack.docschina.org/loaders/postcss-loader/
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('postcss-preset-env')()]
    }
  }
}
```
- browserslist 配置在package.json的browserslist选项中 
- 通过process.env.NODE_ENV区分调用开发(development)还是生产(production)环境的配置
  - 这里不知明的原因，package.json中配置了development导致devServer不会热更新页面
  - 所以去除了package.json中的development配置，只保留production 只在生产时做css兼容处理
- browserslist的github文档地址 https://github.com/browserslist/browserslist

配置eslint语法检查 eslint默认只支持js
```js
// 这里使用 eslint-config-airbnb-base 不包含react语法
// 在rules中添加eslint-loader配置
{
  test: /\.js$/,
  // 排除 node modules
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    // 自动修复eslint的错误
    fix: true
  }
}
// 在package.json中配置，或者新建.eslintrc文件
// https://github.com/airbnb/javascript/blob/eslint-config-airbnb-base-v14.2.0/packages/eslint-config-airbnb-base/README.md
"eslintConfig": {
  "extends": "airbnb-base",
  "env": {
    "browser": true
  }
}

// airbnb的风格不让代码中保留log 所以会waring 但添加 eslint-disable-next-line 后 就不做检查了
// 下一行eslint所有规则都失效（下一行不进行eslint检查）
// eslint-disable-next-line
console.log(222) 
```
