/*
 * @Author: mrzou
 * @Date: 2021-07-31 20:04:54
 * @LastEditors: mrzou
 * @LastEditTime: 2021-08-01 01:32:54
 * @Description: file content
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/bundle.js',
    path: resolve(__dirname, 'build'),
    // assetModuleFilename: 'images/[name].[hash:6][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        // 要使用多个loader处理用use
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: [
          // loader的执行顺序是，从上到下，从右往左执行
          // 此处为数组，所以从右往左执行,第一个执行的就是 less-loader

          // 使用style-loader进行处理，
          // 创建一个style标签并放入编绎完的css
          // 然后塞入页面的head标签中
          // 所以 style-loader 位置必须在css-loader前面
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      // 问题：默认处理不了html中img图片
      // 处理图片资源
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
          // 图片大小小于8kb，就会被base64处理 大于8kb的则默认使用 file-loader处理
          // 优点: 减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          // 给图片进行重命名
          // [hash:6]取图片的hash的前6位
          // [ext]取文件原来扩展名
          // [name]取文件原来的名字
          name: '[name].[hash:6].[ext]',
          outputPath: 'images'
        }
      },
      // {
      //   // 默认情况下，asset/resource 模块以 [hash][ext][query] 文件名发送到输出目录。
      //   // 可以通过在 webpack 配置中设置 output.assetModuleFilename 来修改此模板字符串：
      //   test: /\.(png|gif|jpg|jpeg)$/,
      //   type: 'asset/resource'
      // },
      // 打包其他资源(除了html/js/css资源以外的资源)
      {
        // 排除css/js/html资源
        exclude: /\.(jpg|jpeg|gif|png|css|scss|less|js|html)$/,
        // test: /\.(eot|svg|ttf|woff)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:6].[ext]',
          outputPath: 'media'
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html'
    })
  ],
  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    // 项目构建后路径
    // webpack-cli4.x 与 webpack-dev-server3.x 不兼容
    // 要使用 npx webpack serve 执行
    // 使用 npx webpack-dev-server 会报错
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true
  },
  mode: 'development'
  // mode: 'production'
}
