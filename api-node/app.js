var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv/config');

var authRoutes = require('./routes/authRoutes');
var userRoutes = require('./routes/userRoutes');
var categoryRoutes = require('./routes/categoryRoutes');
var postRoutes = require('./routes/postRoutes');
const authMiddleware = require('./middleware/authMiddleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', [authMiddleware.verify], categoryRoutes);
app.use('/api/posts', [authMiddleware.verify], postRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(process.env.MONGODB_CONNECTION_URL, { useNewUrlParser: true }, (err, res) => {
  if (err) return console.error(err);
  console.log("DB Connected!");
});

module.exports = app;
