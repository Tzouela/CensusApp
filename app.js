require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var participantsRouter = require('./routes/participants');

var db = require("./models");
db.sequelize.sync({ force: false })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/participants', participantsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// API‐style error handler: if client wants JSON, send error as JSON
app.use((err, req, res, next) => {
  // if the request Accept header prefers JSON, or it's under /participants
  if (req.accepts('json') || req.path.startsWith('/participants')) {
    return res
      .status(err.status || 500)
      .json({
        message: err.message || 'Internal Server Error',
        // AJV will have populated err.errors for validation failures
        errors: err.errors || [],
      });
  }
  // otherwise fall through to the view‐based handler
  next(err);
}); 

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
