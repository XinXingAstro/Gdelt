'use strict';

var trend_page = async (ctx, next) => {
    ctx.render('trendAnalysis.html', {
        /*name: 'XinXing'*/
    });
}


module.exports = {
    'GET /trendAnalysis': trend_page
}