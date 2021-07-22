/*
 * @Author: mrzou
 * @Date: 2020-06-30 23:13:33
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-23 00:40:29
 * @Description: file content
 */
const Koa = require('./Koa')
const app = new Koa()

// app.use((req,res) => {
//     res.writeHead(200)
//     res.end('hi kaikeba')
// })
// const delay = () => Promise.resolve(resolve => setTimeout(() => resolve(), 2000));


// app.use(async (ctx, next) => {
//     ctx.body = "1";
//     setTimeout(() => {
//         ctx.body += "2";
//     }, 2000);
//     await next();
//     ctx.body += "3";
// });

// app.use(async (ctx, next) => {
//     ctx.body += "4";
//     await delay();
//     await next();
//     ctx.body += "5";
// });

// app.use(async (ctx, next) => {
//     ctx.body += "6";
// });

const static = require('./static')
// 开启一个静态资源服务器
app.use(static(__dirname + '/public'));

const Router = require('./koa-router')
const router = new Router()

router.get('/index', async ctx => { ctx.body = 'index page'; });
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });

// 路由实例输出父中间件 router.routes()
// 内部返回了一个函数接收ctx, next 两参数
//  return async function(ctx, next) {}
app.use(router.routes());

app.listen(3000, () => {
    console.log('listen port to 3000 ...')
})
