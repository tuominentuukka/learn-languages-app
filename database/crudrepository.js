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
  deleteById: (id, callback) => {
    pool.getConnection((err, connection) => {
      connection.query(
        "DELETE FROM words WHERE id = ?",
        id,

        (err, result) => {
          if (err) {
            callback(err, null);
          }

          callback(null, "deleted word with id " + id);
        }
      );
    });
  },
  save: (words, callback) => {
    pool.getConnection((err, connection) => {
      connection.query(`INSERT INTO words SET ?`, words, (result) => {
        callback("new word pair inserted");
      });
    });
  },
  update: (words, id, callback) => {
    pool.getConnection((err, connection) => {
      connection.query(
        `UPDATE words SET ? WHERE id = ?`,
        words,
        id,
        (result) => {
          callback("words");
        }
      );
    });
  },
};

module.exports = connectionFunctions;
