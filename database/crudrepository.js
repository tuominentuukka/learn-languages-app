/**
 * @author Tuukka Tuominen
 * @version 1.0.0
 */

/**
 * Import mysql.
 */
const mysql = require("mysql");

/**
 * Create pool for mysql connections.
 */
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_host,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

/**
 * Module for database functions.
 * @module connectionFunctions
 */
let connectionFunctions = {
  /**
   * Function to connect to database.
   *  @function connect
   */
  connect: () => {
    pool.on("connection", function (connection) {
      connection.query("SET SESSION auto_increment_increment=1");
    });
  },
  /**
   * Function to close database connection.
   * @function close
   */
  close: () => {
    pool.on("release", function (connection) {
      console.log("Connection %d released", connection.threadId);
    });
  },
  /**
   * Function to find all words on database.
   * @param callback
   * @function findAll
   */
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
  /**
   * Function to delete word from database.
   * @param {number} id - Words id on database
   * @param  callback
   * @function deleteById
   */
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
  /**
   * Function to add new words to database.
   * @param {String} words - Words given on frontend.
   * @param  callback
   * @function save
   */
  save: (words, callback) => {
    pool.getConnection((err, connection) => {
      connection.query(`INSERT INTO words SET ?`, words, (result) => {
        callback("new word pair inserted");
      });
    });
  },
  /**
   * Function to update words on database.
   * @param {String} english_word - Word given on frontend.
   * @param {String} finnish_word - Word given on frontend.
   * @param {number} id - Words id on database.
   * @param  callback
   * @function update
   */
  update: (english_word, finnish_word, id, callback) => {
    pool.getConnection((err, connection) => {
      connection.query(
        `UPDATE words SET english_word=?, finnish_word=? WHERE id=?`,
        english_word,
        finnish_word,
        id,
        (result) => {
          callback("updated word to", english_word, finnish_word);
        }
      );
    });
  },
};

module.exports = connectionFunctions;
