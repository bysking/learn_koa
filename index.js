// koa路由
// express中直接引入express就可以配置路由， koa则不一样需要路由模块koa-router
const koa = require('koa')
const router = require('koa-router')() // 引入的同时直接实例化


const app = new koa()

// ctx上下文 包含request response等信息

// 配置路由
router.get('/', async (ctx) => {
  ctx.body = '首页'
})


router.get('/news', async (ctx) => {
  ctx.body = '这是一个新闻页面'
})

// 动态路由
router.get('/news/:newsId', async (ctx) => {
  console.log(ctx.params)
  ctx.body = '这是一个新闻详情'
})

//动态路由里面可以传入多个值 http://localhost:3000/package/123/456
router.get('/package/:aid/:cid', async (ctx) => {
  //获取动态路由的传值
  console.log(ctx.params)  //{ aid: '123', cid: '456' }
  ctx.body="新闻详情多参数"
})

// get传值
router.get('/package', async (ctx) => {
  //获取动态路由的传值
  console.log(ctx.query)
  console.log(ctx.querystring)
  console.log(ctx.url)
  console.log(ctx.request.query)
  console.log(ctx.request.querystring)
  console.log(ctx.request.url)
  console.log('ctx', ctx)
  ctx.body = ctx
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

