var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var productsRouter = require('./routes/index');
var mongoose = require("mongoose");
var bodyPaser = require("body-paser");
require('dotenv').config();

console.log(process.env.USERID);

var app = express();
app.use(bodyPaser.json());


mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${process.env.USERID}:${process.env.PASSWORD}@cluster0.akhxr6f.mongodb.net/${process.env.DATABASE_NAME}...`,
  (e) => {
    if (e) {
      console.log(e);
    }
    else {
      console.log("Connected to DB");
    }
  });

app.get('/', (req, res) => {

  res.send("Hello Friend!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/products', productsRouter);  // => productsRouter'da tanımladığımız url'lerin başına products yazmamızın gerek olmamasını sağlar.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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

module.exports = app;
