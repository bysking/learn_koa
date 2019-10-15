const koa = require('koa') // 引入koa

const app = new koa() // 实例化koa

app.use(async (ctx) => { // 配置中间件
  ctx.body = 'hello koa'
})

app.listen(3000) // 监听端口