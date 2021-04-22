/*
 * @Author: mrzou
 * @Date: 2021-04-22 21:12:17
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-22 22:41:10
 * @Description: file content
 */
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'app.js'
    },
    resolve: {
        // 模块导入扩展名处理
        extensions: ['.js', '.ts', '.jsx']
    },
    // devtool: 'cheap-module-eval-source-map',  eval-cheap-module-source-map
    // devtool: 'inline-source-map', source-map
    devtool: 'eval-cheap-module-source-map',
    // target: "web",  // 这里很重要，默认是package.json中的browserslist,没有的话值是"web"
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: [{
                    loader: 'ts-loader'
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
        // new webpack.HotModuleReplacementPlugin()
    ]
}