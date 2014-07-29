var emitter=require('events').EventEmitter();
var mysql = require( "mysql" );
var queues = require( 'mysql-queues' );
//var logger = require( './log.js' ).logger( 'Normal' );
var config = require( './confighelper.js' );

function getConnection() {
    var connection = mysql.createConnection( {
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        charset: 'UTF8_GENERAL_CI',
        //debug : ['ComQueryPacket', 'RowDataPacket']//false
        //debug: ['ComQueryPacket']
        debug: false
    });

    queues( connection, true );

    connection.connect( function ( err ) {
        //logger.error( err )
    });

    return connection;
}

function getNews(link,callback){
    var status="ready";
    var select=function(){
        emitter.once("selected", callback);
        if(status==="ready"){
            var connection=this.getConnection();
            connection.query("call usp_News_IsExist(?)", [link], function( err, rows, info ){
                emitter.emit("selected", err, rows, info);

                connection.end();
                connection=null;
                status="ready";
            });
        }
    }
}

module.exports={
    getConnection:getConnection,
    getNews:getNews
};