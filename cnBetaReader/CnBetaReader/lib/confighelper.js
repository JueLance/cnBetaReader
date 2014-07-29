var config = require( "../config/config.json" );

module.exports = {
    proxy: config.proxy,
    database: {
        host: config.database["dbHost"],
        port: config.database["dbPort"],
        user: config.database["uName"],
        password: config.database["uPwd"],
        database: config.database["dbName"],
        secretName: config.database['secretName']
    },
    test: function () {
        console.log( this.proxy );
        console.log( "test" );
    }
};