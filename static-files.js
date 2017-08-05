const path = require('path');
const mime = require('mime');
const mzfs = require('mz/fs');

function staticFiles(url, dir) {
	return async (ctx, next) => {
		let rpath = ctx.request.path;
		if(rpath.startsWith(url)) {
			let fp = path.join(dir, rpath.substring(url.length));
			if(await mzfs.exists(fp)) {
				ctx.response.type = mime.lookup(rpath);
				ctx.response.body = await mzfs.readFile(fp);
			} else {
				ctx.response.status = 404;
			}
		} else {
			await next();
		}
	};
}

module.exports = staticFiles;