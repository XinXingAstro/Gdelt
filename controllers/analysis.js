'use strict';

var analysis_page = async (ctx, next) => {
    ctx.render('analysis.html', {
        /*name: 'XinXing'*/
    });
}


module.exports = {
    'GET /analysis': analysis_page
}