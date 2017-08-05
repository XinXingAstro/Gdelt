const Koa = require('koa');
// const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
// const staticFiles = require('./static-files');
const templating = require('./templating')
const isProduction = process.env.NODE_ENV === 'production';

const app = new Koa();

// app.use(async (ctx, next) => {
//     console.log(`${ctx.request.method} + ${ctx.request.url}`);
//     await next();
// //    ctx.response.type = 'text/html';
// //    ctx.response.body += '<h1> koa2</h1>';
// });

// router.get('/', async (ctx, next) => {
//     ctx.response.body = '<a href = "/hello/XinXing"><h1>This is / page</h1></a>';
// });

// router.get('/hello/:name', async (ctx, next) => {
//     var name = ctx.params.name;
//     ctx.response.body = `<h1>This is Hello ${name} page</h1><a href="/post"><h2>move to post page</h2></a>`;
// });


// router.get('/post', async (ctx, next) => {
//     ctx.response.body = `<h1>This is post page</h1>
//     <form action="/signin" method="post">
//         <p>Name: <input name="name" value="koa"></p>
//         <p>Password: <input name="password" type="password"></p>
//         <p><input type="submit" value="Submit"></p>
//     </form>`;
// });

// router.post('/signin', async (ctx, next) => {
//     var name = ctx.request.body.name || '';
//     var password = ctx.request.body.password || '';

//     console.log(`signin with name: ${name}, password: ${password}`);
//     if(name === 'xinxing' && password === '123456') {
//         ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
//     } else {
//         ctx.response.body = `<h1>Lgin failed!</h1><p><a href="/">try again</a></p>`;
//     }
// });
app.use(async (ctx, next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	var start = new Date().getTime();
	var execTime;
	await next();
	execTime = new Date().getTime() - start;
	ctx.response.set('X-Response-Time', `${execTime}ms`);
});
if(!isProduction) {
	let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static')); 
}
app.use(bodyParser());
app.use(templating('views', {
	noCache: !isProduction,
	watch: !isProduction
}));
app.use(controller());
//app.use(router.routes());
/*
app.use(async (ctx, next) => {
    const start =  new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`next async fun spend: ${ms}ms`);   
});

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello</h1>';
});
*/
app.listen(8000);
console.log('app running at 8000 port');
