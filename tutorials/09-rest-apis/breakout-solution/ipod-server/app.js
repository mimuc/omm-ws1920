var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var songsRouter = require('./routes/songs');
var playlistsRouter = require('./routes/playlists');
var searchRouter = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// instantiate a DataStorage for our iPod's playlist data
var DataStorage = require('./model/DataStorage')
const dataStorage = new DataStorage();
// a way to make that one instance accessible from every middleware: attaching it to the request object
app.use((req,res,next)=> {
  req.dataStorage = dataStorage;
  next();
})


app.use('/', indexRouter);
app.use('/songs', songsRouter);
app.use('/playlists', playlistsRouter); // all requests to /playlists/... are handled by the playlists middleware
app.use('/search', searchRouter);

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
