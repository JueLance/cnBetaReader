var emitter = require( "events" ).EventEmitter;
var util = require( "util" );
var request = require( 'request' );
var selecter = require( 'xpath.js' );
var DOMParser = require( 'xmldom' ).DOMParser;
var config = require( './confighelper.js' );

var self = null;
function Rss() {
    self = this;
    emitter.call( this );
}

util.inherits( Rss, emitter );

Rss.prototype.send = function ( url ) {

    function getChineseDate( date ) {
        return date.getFullYear() + "-" + ( date.getMonth() + 1 ) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

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

        var records = [];

        if ( xml.length > 0 ) {
            var doc = new DOMParser().parseFromString( xml, 'text/xml' );
            var nodes = selecter( doc, "//item" );

            if ( nodes != null && nodes.length > 0 ) {

                for ( var i = 0; i < nodes.length; i++ ) {

                    ( function ( id ) {
                        var item = {};
                        item.id = id;
                        item.title = nodes[i].getElementsByTagName( "title" )[0].firstChild.data;
                        item.link = nodes[i].getElementsByTagName( "link" )[0].firstChild.data;
                        var date = new Date( nodes[i].getElementsByTagName( "pubDate" )[0].firstChild.data );
                        item.pubDate = getChineseDate( date );
                        item.description = nodes[i].getElementsByTagName( "description" )[0].firstChild.data;

                        records.push( item );

                    })( i + 1 );
                }
            }
        }

        self.emit( "received", error, xml, records );
    });
};


exports.Rss = Rss;
