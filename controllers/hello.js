var hello_page = async (ctx, next) => {
	var name = ctx.params.name;
	ctx.response.body = `<h1>This is Hello Page</h1><h1>Hello ${name}</h1><a href="/post">move to POST Page</a>`;
};

module.exports = {
	'GET /hello/:name': hello_page
};