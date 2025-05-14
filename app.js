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

var app = express();

(async function(){
  await db.sequelize.sync({ force: false });
  const { LOGIN_USER, LOGIN_PASSWORD } = process.env;
  if (LOGIN_USER && LOGIN_PASSWORD) {
    const exists = await db.Admin.findOne({ where: { username: LOGIN_USER } });
    if (!exists) {
      await db.Admin.create({
        username: LOGIN_USER,
        password: LOGIN_PASSWORD
      });
      console.log(`Seeded Admin/${LOGIN_USER}`);
    }
  } else {
    console.warn('LOGIN_USER or LOGIN_PASSWORD not set');
  }
})();


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

app.use((err, req, res, next) => {
  if (req.accepts('json') || req.path.startsWith('/participants')) {
    return res
      .status(err.status || 500)
      .json({
        message: err.message || 'Internal Server Error',
        errors: err.errors || [],
      });
  }
  next(err);
}); 

module.exports = app;
