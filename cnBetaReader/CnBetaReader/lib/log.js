//var log4js = require( 'log4js' );

//log4js.configure( {
//    appenders: [
//        { type: "console" },
//        {
//            type: "file",
//            /*absolute: true,*/
//            filename: 'logs/access.log',
//            maxLogSize: 1024,
//            backups: 3,
//            category: 'Normal'
//        }
//    ],
//    replaceConsole: true
//});

//exports.log4js = function () {
//    return log4js;
//}

exports.logger = function ( name ) {
    //var logger = log4js.getLogger( name );
    //logger.setLevel( 'auto' );
    //return logger;

    return null;
}

//intergrate with log4js
//app.use(log4js.connectLogger(logger, { level: 'auto'/*log4js.levels.INFO*/, format: ':method :url' }));
