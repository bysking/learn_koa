const Router = require('koa-router')

module.exports = (app) => {
  let router = new Router()
  router.get('/', async (ctx) => {
    ctx.body = '这是前台首页'
  })

  router.get('/news', async (ctx) => {
    ctx.body = '新闻666666666666页面'
  })

  app.use( router.routes())
}