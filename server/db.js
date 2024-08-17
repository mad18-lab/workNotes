require('dotenv').config();
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

const promisePool = pool.promise();

module.exports= promisePool;