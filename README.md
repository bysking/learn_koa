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

