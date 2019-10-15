const koa = require('koa') // 引入koa

const app = new koa() // 实例化koa

app.use(async (ctx) => { // 配置中间件
  ctx.body = 'hello koa'
})

app.listen(3000) // 监听端口

async function getData(){ // async 返回一个promise对象
  return '这是一个数据';
}
async function test() {
  const d = await getData()
  console.log(d)
}

// test() // 测试异步函数中等待异步函数执行

async function getdate() {
  console.log(2)
  return '这是一个数据'
}

async function test2() {
    console.log(1)
    var d = await getdate()
    console.log(3)
    console.log(4)
}

// test2() // await 阻塞功能把异步改为同步

function findData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('后知后觉')
    }, 1000)
  })
}

async function test3() {
  const v = await findData()
  console.log(v)
}

test3() // 封装Promise 与async await一起使用