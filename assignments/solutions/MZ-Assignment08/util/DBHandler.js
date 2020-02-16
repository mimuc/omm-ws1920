/**
 * Created by Tobi on 06/12/2016.
 */

var dbConfig = require('../config/database');
var mysql = require('mysql');

function DBHandler(config) {
  config = config || dbConfig;
  ///////////////////////////////////////////////////////////////////////////////////
  ///// LOCAL VARIABLES (PRIVATE)
  ///////////////////////////////////////////////////////////////////////////////////
  var connection = mysql.createConnection(config.connection);

  /**
   * creates a table for the users in the database, if it does not exist
   *
   * @param {Connection} connection to the mysql database.
   * @private
   */
  function _ensureUsersTable(connection) {
    if (connection && connection.state === 'connected') {
      var query = 'CREATE TABLE IF NOT EXISTS `' + config.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \ )';

      connection.query(query, null, function(err) {
        if (err) {
          console.warn(err);
        } else {
          console.log('Users table OK.');
        }
      });
    }
  }


  ///////////////////////////////////////////////////////////////////////////////////
  ///// INSTANCE METHODS
  ///////////////////////////////////////////////////////////////////////////////////

  /**
   *
   * creates a row in the database for the user.
   *
   * @param {string} username (unique) user name.
   * @param {string} password should already be hashed with your preferred hash method
   * @param {dbCallback} callback
   *
   */
  var addUser = function(username, password, callback) {
    var insertQuery = 'INSERT INTO ' + config.users_table + ' (username, password) VALUES (?,?)';
    if (username && password) {
      connection.query(insertQuery, [username, password], function(err, data) {
        if (!err && data && data.insertId) {
          return callback(null, data.insertId);
        } else {
          return callback(err, data);
        }
      });
    } else {
      return callback(new Error('parameters missing'));
    }
  };

  /**
   * passes a user Object to the callback. Selects the user based on the id.
   * @param {number|string} id of the row in the table (user id)
   * @param {dbCallback} callback is called in any case.
   */
  var getUserById = function(id, callback) {
    var selectQuery = 'SELECT * FROM users WHERE id = ? ';
    connection.query(selectQuery, [id], function(err, rows) {
      callback(err, rows[0]);
    });
  };

  /**
   * passes a user object to the callback. Selects the user based on the username.
   * @param {string} username is the unique name of the user.
   * @param {dbCallback} callback is called in any case.
   */
  var getUserByUsername = function(username, callback) {
    var selectQuery = 'SELECT * FROM ' + config.users_table + ' WHERE username = ?';
    connection.query(selectQuery, [username], function(err, rows) {
      callback(err, rows[0]);
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////
  /////   INITIALIZATION
  ///////////////////////////////////////////////////////////////////////////////////


  // connect to the database through the connection settings object.
  connection.connect(null, function(err) {
    if (!err) {
      // there was no error, so we can ensure
      // that there is a users table
      _ensureUsersTable(connection);
    }
    else {
      console.warn(err);
    }
  });

  // public API
  return {
    addUser : addUser,
    getUserById: getUserById,
    getUserByUsername: getUserByUsername
  }
}


module.exports = DBHandler;

/**
 * We handle all callbacks in the same way:
 * @callback dbCallback
 * @param {Error}
 * @param {Object}
 */
