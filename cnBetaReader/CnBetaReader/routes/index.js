/**
* Created with Microsoft WebMatrix
* User: Zi-Cheng, Zhu
* Date: 13-10-15
* Time: 00:05
* To change this template use File | Settings | File Templates.
*/
var db = require('../lib/db.js');
var Rss = require('../lib/rss.js').Rss;
var rss = new Rss();

exports.autoroute = {
    'get': {
        '(.?)/(index)?': getCnbetaNews,
        /* '(.?)/news/add/:id': addNews,*/
    }
};

function getCnbetaNews(req, res) {

    rss.send("http://www.cnbeta.com/rss");

    rss.on('received', function (err, html, records) {

        if (err) {
            throw err;
        }

        res.render('index', { list: records, source: html });
    });
}
