/**
 * Created by Tobi on 06/12/2016.
 */

// from https://github.com/manjeshpv/node-express-passport-mysql/
// config/database.js
module.exports = {
  'connection': {
    'host': 'localhost', // you can probably leave this.
    'user': 'root', // if you have root access, leave this
    'password': '', // if you use XAMPP and did not reconfigure it, the empty password is correct.
    'database': 'mmn1617' // make sure to create this database first.
  },
  'users_table': 'users'
};