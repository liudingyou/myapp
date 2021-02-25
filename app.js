const createError = require('http-errors');
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');

const compression = require('compression');
const helmet = require('helmet');

const app = express();
var session = require('express-session');
//Compress all routes
app.use(helmet());
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express) ;
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

// 使用 session 中间件
app.use(session({
  secret:'secret', // 对session id 相关的cookie 进行签名
  resave:true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie:{
    maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}));

//登陆拦截
app.use(function(req,res,next){
  if(req.session.userName){
    next();
  }else{
    if(req.originalUrl === '/catalog' || req.originalUrl === '/catalog/user/login'){
      next();
    }else{
      res.redirect('/catalog');
    }
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);
app.use('/public', express.static('/public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  res.render('404');
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
