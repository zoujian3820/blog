/*
 * @Author: mrzou
 * @Date: 2021-07-31 20:04:54
 * @LastEditors: mrzou
 * @LastEditTime: 2021-08-01 20:14:09
 * @Description: file content
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { resolve } = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')
// 设置nodejs环境变量
// 此处删除则 webpack 运行时默认走 production
// 所以会导致 css兼容处理的 browserslist配置取 production
// 进而导致 页面的热加载失效
// 所以此处 后面应该放到 package.json中的启动脚本上配置
// 此处的Node_ENV属于node的运行时环境变量 与 webpack的mode编绎模式要区分 不是一个东西
// process.env.NODE_ENV = 'development'

module.exports = {
  entry: {
    aa: './src/js/index.js'
  },
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
    chunkFilename: 'js/[name].[contenthash:10]_chunk.js' // 非入口chunk的名称
    // library: '[name]', // 整个库向外暴露的变量名
    // libraryTarget: 'window' // 变量名添加到哪个上 browser
    // libraryTarget: 'global' // 变量名添加到哪个上 node
    // libraryTarget: 'commonjs' // umd amd
    // assetModuleFilename: 'images/[name].[hash:6][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 因为要把css抽成单个文件，所以不能用style-loader
        // use: ['style-loader', 'css-loader']
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     plugins: [
          //       // postcss的插件
          //       require('postcss-preset-env')()
          //     ]
          //   }
          // }
          {
            // https://webpack.docschina.org/loaders/postcss-loader/
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // 给 postcss-loader 找到package.json中的browserslist配置
                // 通过配置加载指定的兼容样式
                // https://github.com/browserslist/browserslist
                plugins: [require('postcss-preset-env')()]
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        // 要使用多个loader处理用use （use中执行顺序 从右到左 或者叫 从下到上 依次执行）
        // 因为要把css抽成单个文件，所以不能用style-loader
        // style-loader 创建style标签，将js中的样式资源通过style标签，添加到页面head中
        // css-loader  把css文件变成commonjs模块加载到js中，里面内容是样式字符串
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     plugins: [
          //       // postcss的插件
          //       require('postcss-preset-env')()
          //     ]
          //   }
          // }
          {
            // https://webpack.docschina.org/loaders/postcss-loader/
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')()]
              }
            }
          }
        ]
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
          // { loader: 'style-loader' },
          MiniCssExtractPlugin.loader, // 因为要把css抽成单个文件，所以不能用style-loader
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     plugins: () => [
          // postcss的插件  此种写法 在webpack5中不兼容 可在根目录下建 postcss.config.js
          // 或者用下面的配置
          //       require('postcss-preset-env')()
          //     ]
          //   }
          // }
          {
            // https://webpack.docschina.org/loaders/postcss-loader/
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')()]
              }
            }
          }
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
      },
      /*
        语法检查： eslint-loader  eslint
          注意：只检查自己写的源代码，第三方的库是不用检查的
          设置检查规则：
            package.json中eslintConfig中设置~
              "eslintConfig": {
                "extends": "airbnb-base"
              }
            airbnb --> eslint-config-airbnb-base  eslint-plugin-import eslint
      */
      {
        test: /\.js$/,
        // 排除 node modules
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 预设：指示babel做怎么样的兼容性处理
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // 按需加载
                    useBuiltIns: 'usage',
                    // 指定core-js版本
                    corejs: {
                      version: 3
                    },
                    // 指定兼容性做到哪个版本浏览器
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                      safari: '10',
                      edge: '17'
                    }
                  }
                ]
              ]
            }
          },
          // {
          //   loader: 'eslint-loader',
          //   options: {
          //     // 自动修复eslint的错误
          //     fix: true
          //   }
          // }
        ]
      }
    ]
  },
  resolve: {
    // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 告诉 webpack 解析模块是去找哪个目录
    modules: ['node_modules'] // resolve(__dirname, '../../node_modules'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
      // 默认值，可以不写~
      /* minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSiza: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunk最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      cacheGroups: {
        // 分割chunk的组
        // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
        // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10
        },
        default: {
          // 要提取的chunk最少被引用2次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true
        }
      } */
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化, 防止缓存失效
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启多进程打包
        parallel: true,
        terserOptions: {
          // 删除注释
          output: {
            comments: false
          },
          compress: {
            // 去除debug、console
            warnings: true,
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log'] // 移除console
          }
        }
      })
    ]
  },
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    // 使用optimize-css-assets-webpack-plugin插件压缩css
    new OptimizeCssAssetsPlugin()
  ],
  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    // 项目构建后路径
    // webpack-cli4.x 与 webpack-dev-server3.x 不兼容
    // 要使用 npx webpack serve 执行
    // 使用 npx webpack-dev-server 会报错

    // contentBase: resolve(__dirname, 'build'),
    // contentBase已经弃用了，正确应该改为：
    static: {
      directory: resolve(__dirname, 'build')
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true
    // hot: true
  },
  performance: {
    // https://webpack.js.org/configuration/performance/#root
    maxEntrypointSize: 10000000,
    maxAssetSize: 30000000
  },
  devtool: 'source-map',
  // mode: 'development'
  mode: 'production'
}
