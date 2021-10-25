const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const pool =  mysql.createPool({
  connectionLimit: dbConfig.LIMIT,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = pool;
