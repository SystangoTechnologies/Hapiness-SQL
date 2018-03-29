require('dotenv').config();
module.exports = {
    development: {
        host: process.env.DBHOST,
        dialect: 'mysql',
        database: process.env.DATABASE,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    test: {
        host: process.env.DBHOST,
        dialect: 'mysql',
        database: 'hapiness_test',
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
    },
    production: {
        host: process.env.DBHOST,
        dialect: 'mysql',
        database: process.env.DATABASE,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS
    }
};