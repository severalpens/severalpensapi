var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var app = express();
app.use(cors());
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var indexRouter = require('./routes/index');
var btcRouter = require('./routes/btc/btc');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({extended: false }));
app.use(express.urlencoded({limit: '50mb',extended: false}));
app.use(bodyParser.json({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/btc', btcRouter);
app.use((req,res,next) => {
  try{
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
      if(err){
        console.log(`jwt verify failed`);
        req.verified = false;
        return res.status(404).send(false);
      }
     req.verified = true;
     req.user_id = decoded._id;
     next();
    }); 
  }
  catch {
    return res.status(404).send(false);
  }
})


app.use('/', indexRouter);






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
