'use strict';
/*var root_page = async (ctx, next) => {
    ctx.response.body = '<a href = "/hello/XinXing"><h1>This is / page</h1></a>';
};

module.exports = {
	'GET /': root_page
};*/

var root_page = async (ctx, next) => {
	ctx.render('index.html', {
		/*name: 'XinXing'*/
	});
}


module.exports = {
	'GET /': root_page
}