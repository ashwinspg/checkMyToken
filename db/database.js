const {Pool} = require('pg')

const config = require('../config/config');

const pool = new Pool({
    // user: config.dbUserName,
    // password: config.dbPassword,
    // host: config.dbHost,
    // port:config.dbPort,
    // database: config.dbName,
    connectionString: config.databaseURL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

module.exports = pool