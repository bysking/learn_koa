# learn_koa
1. 搭建基本的框架
2. 监视入口文件 nodemon app.js


		1.cd 到项目里面
		2.npm init --yes   /   npm init  创建package.json
		3.通过命令安装koa
			 npm install koa --save
			 cnpm install koa --save
		4.引入koa使用
			//引入Koa
			const koa=require('koa');
			const app=new koa();
			//配置koa中间件
			app.use( async (ctx)=>{
			 ctx.body='hello koa2'
			})
			//监听端口
			app.listen(3000);

接下来，我们一起创建一个基本的 koa 应用

async await 理解 async 声明一个函数异步的， await 是 async await 的简写 含义为等待一个异步方法执行完成
-------------------------------------------
1. 中间件：
1) 执行任何代码
2) 修改请求和响应对象
3) 终结请求-响应循环
4）调用堆栈中的下一个中间件

路由想向下继续匹配就需要next()

2. koa可以应用下面的几种中间件
1）应用级中间件
2）路由级别中间件
3）错误处理中间件
4）第三方中间件

3. 应用级别中间件
引入koa koa-router 实例化Koa,koa-router
app.use(async (ctx,next) => {
  // 做些事情在这里
  await next()
})
router.get('/', (ctx, next) => {
  ctx.body = ''
})
router.get('/news', (ctx, next) => {
  ctx.body = ''
})

app.use(router.routes()) //启动路由器
app.use(router.allowedMethods()) // 请求出现错误时的处理逻辑
app.listen(3000, () => {
  console.log('starting at port 3000')
})



2. 路由级别中间件
router.get('/', async(ctx, next)=>{
	console.log(1)
	next() // 继续匹配
})
router.get('/', function (ctx) {
	ctx.body="Hello koa";
})


2） 错误处理中间件
app.use(async (ctx, next) => {
  await next() // 等待返回向下执行
  if(ctx.status == 404) {
    ctx.status = 404
    ctx.body = "这是一个404页面"
  }
})

3) 第三方中间件 资源服务器

const static = require('koa-static')

const staticPath = './static'
app.use(static(
  path.join(__dirname, staticPath)
))

const bodyPaser = require('koa-bodyparser')
app.use(bodyPaser()) //解析器post数据


- 中间件的执行顺序
洋葱圈
- GET 请求数据获取
1.是从上下文中直接获取
     请求对象ctx.query，返回如 { a:1, b:2 }

     请求字符串 ctx.querystring，返回如 a=1&b=2


2.是从上下文的request对象中获取



    请求对象ctx.request.query，返回如 { a:1, b:2 }

    请求字符串 ctx.request.querystring，返回如 a=1&b=2


- POST请求数据获取
对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中

 1、安装 koa-bodyparser

npm install --save koa-bodyparser


2、安装  koa-bodyparser 引入配置中间件


var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var app = new Koa();
app.use(bodyParser());
 
app.use(async ctx => { 
  ctx.body = ctx.request.body;
});



3、通过ctx.request.body 获取post提交的数据


ctx.request.body  获取post提交的数据

- koa-static 处理访问静态资源
安装：const static = require('koa-static')

app.use(static(
  path.join(__dirname, 'public')
))

- koa2中Coockie的使用
ctx.cookies.set(key,value,options)
  // options:
  maxAge              一个数字表示从 Date.now() 得到的毫秒数
  expires cookie      过期的 Date
  path cookie         路径, 默认是'/'
  domain cookie       域名
  secure             安全 cookie   默认false，设置成true表示只有 https可以访问
  httpOnly           是否只是服务器可访问 cookie, 默认是 true
  overwrite          一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。

- koa获取cookie
ctx.cookies.get(key)

- koa中设置中文cookie
base64编码
new Buffer('hello, world!').toString('base64')
编码还原
new Buffer('aGVsbG8sIHdvcmxkIQ==', 'base64').toString()

- koa 实现session
session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而session保存在服务器上
session工作流程 当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生成一个类似于key,value的键值对， 然后将key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带key(cookie)，找到对应的session(value)。 客户的信息都保存在session中

https://www.itying.com/koa/article-index-id-60.html

安装： npm install koa-session --save
引入： const session = require('session')

app.keys = ['some secret hurr'];
const CONFIG = {
   key: 'koa:sess',   //cookie key (default is koa:sess)
   maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));

设置值 ctx.session.username = '123' 取值 ctx.get

四、Koa中Cookie和Session区别


1、cookie数据存放在客户的浏览器上，session数据放在服务器上。


2、cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗
   考虑到安全应当使用session。


3、session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
   考虑到减轻服务器性能方面，应当使用COOKIE。


4、单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。


- ejs 模板 循环取出数据
<% for (var i = 0; i < list.length; i++) { %>
  <%= list[i] %>
<% } %>

- if -else
<% if (user) { %>
  <%= user.name %>
<% } %>

- 上传图片模块 - multer
Multer不会处理任何非multiart/form-data类型的表单数据。意思就是上传的图片数据必须子啊表达那上面添加 multipart/form-data

安装koa2的koa-multer
npm install multer --save

引入模块 const multer = require('koa-multer')
// 配置
const storage = multer.diskStorage({
  // 文件保存路径
  destination: (req, file, cd) => {
    cd(null, 'public/uploads/') // 路径必须存在
  }
  // 修改文件名字
  filename: (req, file, cd) => {
    const filename = (file.originnalname).split('.')
    cd(null, Date.now() + "." + fileFormat[fileFormat.length - 1 ])
  }
})

// 加载配置
const upload = multer({storage: storage})


使用koa-multer
router.post('/doAdd', upload.single('face'), async (ctx, next) => {
  ctx.body = {
    filename: ctx.req.file.filename,
    body: ctx.req.body
  }
})

注意：-------- Form表单加上enctype="multipart/form-data"


- 一次上传多个图片
前台表单：后台：


router.post('/doAdd', upload.fields([{ name: 'pic', maxCount: 1 }, { name: 'aaa', maxCount: 1 }]),async (ctx)=>{

    console.log(ctx.req.files);
})

jsonp
 const Koa = require('koa')
const jsonp = require('koa-jsonp')
const app = new Koa()


// 使用中间件  
app.use(jsonp())


app.use( async ( ctx ) => {
  
  let returnData = {
    success: true,
    data: {
      text: 'this is a jsonp api',
      time: new Date().getTime(),
    }
  }

  // 直接输出JSON支持jsonp
  ctx.body = returnData // 直接返回对象数据由jsonp处理
})


app.listen(3000, () => {
  console.log('[demo] jsonp is starting at port 3000')
})





