/*var post_page = async (ctx, next) => {
	ctx.response.body = `<h1>This is post page</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
};

var signin_page = async (ctx, next) => {
	var name = ctx.request.body.name || '';
	var password = ctx.request.body.password || '';

	console.log(`signin with name: ${name} ; password: ${password}`);
	if(name === 'xinxing' && password === '123456') {
		ctx.response.body = `<script>alert(\`signin with name: ${name} ; password: ${password}\`)</script><h1>WELCOME ${name}!!!</h1>`;
	} else {
		ctx.response.body = `<a href="/post">Try Again</a>`;
	}
};

module.exports = {
	'GET /post': post_page,
	'POST /signin': signin_page
};*/

var signin_page = async (ctx,next) => {
	var email = ctx.request.body.email || '';
	var password = ctx.request.body.password || '';
	if(email === 'xinxing' && password === '123456') {
		ctx.render('signin-ok.html', {
			title: 'Sign In Success!',
			name: `${name}`
		});
	} else {
		ctx.render('signin-failed.html', {
			title: 'Sign In Failed!'
		});
	}
}

module.exports = {
	'POST /signin': signin_page
}