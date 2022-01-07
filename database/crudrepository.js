const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_host,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

let connectionFunctions = {
  connect: () => {
    pool.on("connection", function (connection) {
      connection.query("SET SESSION auto_increment_increment=1");
    });
  },
  close: () => {
    pool.on("release", function (connection) {
      console.log("Connection %d released", connection.threadId);
    });
  },
  findAll: (callback) => {
    pool.getConnection((err, connection) => {
      connection.query("select * from words", (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    });
  },
};

module.exports = connectionFunctions;
