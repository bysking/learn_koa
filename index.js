// koa路由
// express中直接引入express就可以配置路由， koa则不一样需要路由模块koa-router
const koa = require('koa')
const Router = require('koa-router')


const app = new koa()
const router = new Router()

// ctx上下文 包含request response等信息

// 配置路由
router.get('/', async (ctx) => {
  ctx.body = '首页'
})

router.get('/news', async (ctx) => {
  ctx.body = '这是一个新闻页面'
})

// 启动路由
app.use(router.routes())
    .use(router.allowedMethods())
// 所以在当所有 路由中间件最后调用.
// 此时根据 ctx.status 设置 response 响应头

// app.use(async (ctx) => {
//   ctx.body = '你好 koa'
// })

app.listen(3000)

