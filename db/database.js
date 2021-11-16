const {Pool} = require('pg')

const config = require('../config/config');

const pool = new Pool({
    connectionString: config.databaseURL,
    max: 15,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: false,
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

module.exports = pool