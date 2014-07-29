//var cluster = require('cluster');

//// Master process - starts the workers
//if (cluster.isMaster) {

//  var cpu_count = require('os').cpus().length;

//  // Create a worker process for each core
//  require('os').cpus().forEach(function() {

//    // Start a worker process
//    cluster.fork();

//  });

//  // In case a worker dies, a new one should be started
//  cluster.on('exit', function (worker, code, signal) {
//    cluster.fork();
//  });

//}
//// Code for the worker processes to execute
//else {

//var worker_id = 'Worker' + cluster.worker.id;


/**
* Module dependencies.
*/

var express = require( 'express' )
var routes = require( './routes' );
var http = require( 'http' );
var path = require( 'path' );
var util = require( 'util' );
var fs = require( 'fs' );
var tracer = require( './lib/tracer.js' );
var config = require( './lib/confighelper.js' );

var MySQLSessionStore = require( 'connect-mysql-session' )( express );
var autorouter = require( 'express-autoroute' );

var app = express();// crate an instance of the express module
autorouter( app );

// all environments
app.set( 'port', process.env.PORT || 1337 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
//app.set('env', 'development');

//use middleware
app.use( express.favicon() );
//The logger middleware supports four predefined log formats: default, short, tiny, and dev. You can specify one of them this way:
//app.use(express.logger('dev'));
app.use( express.logger( { format: ':remote-addr :method :url', stream: fs.createWriteStream( './logs/access_express.log', { 'flags': 'w' }) }) );

//we need to enable a built-in middleware named bodyParser before we can process POST submissions.
app.use( express.bodyParser() );
app.use( express.methodOverride() );
app.use( express.cookieParser( config.database.secretName ) );
//app.enable('name'): Enables a setting in the app
//app.disable('name'): Disables a setting in the app
//app.enabled('name'): Checks if a setting is enabled
//app.disabled('name'): Checks if a setting is disabled

app.use( express.session( {
    //    store: new MySQLSessionStore(dbConfig["dbName"], dbConfig["uName"], dbConfig["uPwd"], {
    //        forceSync : false,
    //        checkExpirationInterval : 1000*60*10,
    //        defaultExpiration : 1000*60*60*0.5
    //    }),
    //    secret: dbConfig["secretName"]
}) );

app.use( tracer.saveRequestLog( function ( err, rows, info ) {
    if ( err ) {
        console.log( err );
    }
}) );

//app.use(log4js.connectLogger(logger, { level:  /*'auto'*/ log4js.levels.INFO, format: ':method :url' }));
app.use( app.router );
app.use( require( 'less-middleware' )( { src: path.join( __dirname, 'public' ) }) );

// Express has a middleware called static, using which we can mark a directory in the filesystem for serving static files for the app. Any file kept in these directories can be directly accessed via the browser.
app.use( express.static( path.join( __dirname, 'public' ) ) );

// development only
if ( 'development' == app.get( 'env' ) ) {
    // Add the responseTime middleware
    app.use( express.responseTime() );
    app.use( express.errorHandler() );
}

http.createServer( app ).listen( app.get( 'port' ), function () {
    //console.log( 'Express server listening on port ' + app.get( 'port' ) +' at '+ worker_id);//app.get('port'): Retrieves value set by app.set();
    console.log( 'Express server listening on port ' + app.get( 'port' ) );
});


//}

