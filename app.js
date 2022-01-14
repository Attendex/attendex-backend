var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors'); 

// get all routes
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/account/login');
var signUpRouter = require('./routes/account/signup');
var deleteAccountRouter = require('./routes/account/deleteaccount');

var addBookRouter = require('./routes/book/addbook');
var deleteBookRouter = require('./routes/book/deletebook');
var getBookRouter = require('./routes/book/getbook');
var updateBookRouter = require('./routes/book/updatebookname');

var addMemberRouter = require('./routes/members/addmember');
var deleteMemberRouter = require('./routes/members/deletemember');
var getMemberRouter = require('./routes/members/getmember');
var updateMemberNameRouter = require('./routes/members/updatemembername');

var deleteSheetRouter = require('./routes/sheet/deletesheet');
var addSheetRouter = require('./routes/sheet/addsheet');
var getSheetRouter = require('./routes/sheet/getsheet');
var getDateRouter = require('./routes/sheet/getdate');
var updateMemberAttendanceRouter = require('./routes/memberattendance/updatememberattendance');


var db = require('./src/connection');

var app = express();

app.listen('3000', () => {
  console.log('Server started on port 3000');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

app.use('/', indexRouter);

app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/deleteaccount', deleteAccountRouter);

app.use('/addbook', addBookRouter);
app.use('/deletebook', deleteBookRouter);
app.use('/getbook', getBookRouter);
app.use('/updatebookname', updateBookRouter);

app.use('/addmember', addMemberRouter);
app.use('/deletemember', deleteMemberRouter);
app.use('/getmember', getMemberRouter);
app.use('/updatemembername', updateMemberNameRouter);

app.use('/addsheet', addSheetRouter);
app.use('/deletesheet', deleteSheetRouter);
app.use('/getsheet', getSheetRouter);
app.use('/getdate', getDateRouter);

app.use('/updatememberattendance', updateMemberAttendanceRouter);

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
