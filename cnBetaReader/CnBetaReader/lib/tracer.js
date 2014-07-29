var db = require( '../lib/db.js' );

module.exports = {
    saveRequestLog: function ( callback ) {
		//TODO: need fittle the request 2014-05-09
		return function ( req, res, next ) {
            var url = req.url;
            var method = req.method;
            var statuscode = req.statusCode;
            var useragent = req.headers['user-agent'];
            var referer = req.headers['referrer'] || req.headers['referer'];
            var ip = req.ip;

            var connection = db.getConnection();

            connection.query( "call usp_News_AddRequest(?, ?, ?, ?, ?, ?)", [url, method, statuscode, useragent, referer, ip], function ( err, rows, info ) {

                connection.end();
                connection = null;

                if ( callback ) {
                    callback( err, rows, info );
                }
            });

            next();
        }
	}
}
