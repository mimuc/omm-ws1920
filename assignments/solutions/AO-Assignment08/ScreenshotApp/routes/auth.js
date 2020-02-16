/**
 * Created by Tobi on 06/12/2016.
 */


/** This entire file is heavily inspired by https://github.com/manjeshpv/node-express-passport-mysql **/

var express = require('express');
var path = require('path');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// you can pass a config object to the DBHandler to overwrite the connection settings.
var dbHandler = require('../util/DBHandler')();

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  dbHandler.getUserById(id, done);
});


passport.use('mmn-register', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done) {
  var newUser;
  if (username && password) {
    newUser = {
      username: username,
      password: bcrypt.hashSync(password, null, null)
    };
    dbHandler.addUser(newUser.username, newUser.password, function(err, id) {
      if (!err) {
        newUser.id = id;
        done(null, newUser);
      } else {
        done(err);
      }
    });
  } else {
    done(new Error('parameters missing'));
  }
}));


passport.use('mmn-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    if (username && password) {
      dbHandler.getUserByUsername(username, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user || !bcrypt.compareSync(password, user.password)) {
          done(new Error('wrong credentials'));
        }
        // all is well, call back with user object.
        done(null, user);
      });
    } else {
      done(new Error('parameters missing'));
    }
  }));


router.post('/register', passport.authenticate('mmn-register', {
  successRedirect: '/secret',
  failureRedirect: '/register.html'
}));

router.post('/login', passport.authenticate('mmn-login', {
  successRedirect: '/secret',
  failureRedirect: '/'
}));

router.use('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
});

/**
 * middleware to make sure the user is authenticated. If so, the user is authorized to go to next().
 *
 * @param req Request (Express)
 * @param res Response
 * @param next function in middle ware chain
 */
router.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};


module.exports = router;

