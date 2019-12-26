var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// the login route. Itself requires BasicAuth authentication. When successful, a JWT token is generated
app.use('/login', (req,res,next) => {
  if (req.headers.authorization !== 'Basic c3R1ZGVudDpvbW1pc2F3ZXNvbWU=') { // student ommisawesome
    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send()
    return
  }
  else {
    const jwt = require('njwt')
    const claims = {permission: 'read-data', username: 'student'}
    const token = jwt.create(claims, 'something-top-secret')
    token.setExpiration(new Date().getTime() + 60 * 1000)
    const jwtTokenSting = token.compact()
    res.send(jwtTokenSting)
  }
})

// the middleware being called before all other endpoints (except "/login", because "/login" is registered before this one
app.use((req,res,next) => {
  const jwt = require('njwt')
  const { token } = req.query;
  jwt.verify(token, 'something-top-secret', (err, verifiedJwt) => {
    if(err){
      res.status(401).send(err.message)
    }else{
      // if verification successful, continue with next middlewares
      console.log(verifiedJwt)
      next()
    }
  })
})

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
