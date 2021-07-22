/*
 * @Author: mrzou
 * @Date: 2020-06-30 23:13:33
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-23 00:39:05
 * @Description: file content
 */
const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
class Koa {
    constructor(){
        this.middlewares = []
    }
    listen(...args) {
        const server = http.createServer(async (req, res) => {

            // 创建上下文
            const ctx = this.createContext(req, res)
            const fn = this.compose(this.middlewares)
            await fn(ctx)
            // this.callback(req,res)
            // this.callback(ctx)

            // 最终中间件中更改的body值 会发送回客服端
            res.end(ctx.body)
        })
        server.listen(...args)
    }
    // use(callback) {
    //     this.callback = callback
    // }
    use(middleware){
        this.middlewares.push(middleware)
    }
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
    compose(middlewares) {
        return function (ctx) {
            return dispatch(0)
            function dispatch(i) {
                let fn = middlewares[i]
                if (!fn) {
                    return Promise.resolve()
                }
                // 返回promise是因为 app.use回调中使用了 await
                return Promise.resolve(
                    fn(ctx, function next() {
                        return dispatch(i + 1)
                    })
                )
            }
        }
    }
}
module.exports = Koa
