var emitter = require( "events" ).EventEmitter;
var util = require( "util" );
var request = require( 'request' );
var config = require( './confighelper.js' );

var self = null;

function HttpHelper() {
    self = this;
    emitter.call( this );
}
util.inherits( HttpHelper, emitter );

HttpHelper.prototype.get = function ( url, callback ) {

    // var r=request.defaults({'proxy':"http://web-proxy.cup.hp.com:8088"});
    // r.get('http://www.cnbeta.com/rss', );

    var opt = {
        url: url,
        proxy: config.proxy,
        headers: {
            //'encoding':null
            //"Accept-Language":"iso-8859-5, unicode-1-1;q=0.8"
        }
    };

    request( opt, function ( error, response, body ) {
        var xml = "";
        if ( !error && response && response.statusCode == 200 ) {
            xml = body;
        } else {
            xml = "";
        }

        if ( callback ) {
            callback( error, response, body );
        } else {
            self.emit( "received", error, response, body );
        }
    });
};

exports.HttpHelper = HttpHelper;
