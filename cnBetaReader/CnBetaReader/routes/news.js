var cheerio = require( 'cheerio' );
var db = require( '../lib/db.js' );
var HttpHelper = require( '../lib/HttpHelper' ).HttpHelper;

var http = new HttpHelper();

exports.autoroute = {
    'get': {
        '(.?)/news?': getNews
    }
};

function getNews( req, res ) {

    http.get( req.query.url, function ( error, response, body ) {
        addContent( req.query.url, body, function ( err, rows, info ) {
            //console.log(req.query.url+" insert into db.");
        });
        //res.end(body);

        var obj = getNewsModel( req.query.url, body );
        addNews( obj, function ( err, rows, info ) {
            if ( err ) {
                console.log( err );
                throw err;
            }
        });

        res.render( 'news', obj );
    });
}

function addContent( link, content, callback ) {
    var connection = db.getConnection();

    connection.query( "call usp_News_AddContent(?, ?)", [link, content], function ( err, rows, info ) {

        connection.end();
        connection = null;

        if ( callback ) {
            callback( err, rows, info );
        }
    });
}

function addNews( newsModule, callback ) {

    var connection = db.getConnection();

    connection.query( "call usp_News_AddNews(?, ?, ?, ?, ?, ?)", [newsModule.title, newsModule.date, newsModule.where, newsModule.introduction, newsModule.content, ""], function ( err, rows, info ) {

        connection.end();
        connection = null;

        if ( callback ) {
            callback( err, rows, info );
        }
    });

}

function getNewsModel( url, html ) {

    var $ = cheerio.load( html );
    
    var title = $( 'h2#news_title' ).text();
    
    var date = $( 'span.date', 'div.title_bar' ).text().trim();
    
    var where = $( 'span.where', 'div.title_bar' ).text().trim().replace( '稿源：', '' );
    
    var introduction = $( 'div.introduction' ).text().trim();
    
    var content = $( 'div.content' ).html();

    return { url: url, title: title, date: date, where: where, introduction: introduction, content: content, source: html };
}
