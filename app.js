var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

// get all routes
var indexRouter = require('./routes/index');
var createAccountRouter = require('./routes/account/createaccount');
var deleteAccountRouter = require('./routes/account/deleteaccount');
var authenticatePasswordRouter = require('./routes/account/authenticatepassword');
var addBookRouter = require('./routes/book/addbook');
var deleteBookRouter = require('./routes/book/deletebook');
var getBookRouter = require('./routes/book/getbook');
var addMemberRouter = require('./routes/members/addmember');
var deleteMemberRouter = require('./routes/members/deletemember');
var getMemberRouter = require('./routes/members/getmember');
var addSheetRouter = require('./routes/sheet/addsheet');
var deleteSheetRouter = require('./routes/sheet/deletesheet');
var addMemberAttendanceRouter = require('./routes/memberattendance/addmemberattendance');
var updateMemberAttendanceRouter = require('./routes/memberattendance/updatememberattendance');
var getMemberAttendanceRouter = require('./routes/memberattendance/getmemberattendance');

var db = require('./connection');

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

app.use('/', indexRouter);
app.use('/createaccount', createAccountRouter);
app.use('/deleteaccount', deleteAccountRouter);
app.use('/authenticatepassword', authenticatePasswordRouter);
app.use('/addbook', addBookRouter);
app.use('/deletebook', deleteBookRouter);
app.use('/getbook', getBookRouter);
app.use('/addmember', addMemberRouter);
app.use('/deletemember', deleteMemberRouter);
app.use('/getmember', getMemberRouter);
app.use('/addsheet', addSheetRouter);
app.use('/deletesheet', deleteSheetRouter);
app.use('/addmemberattendance', addMemberAttendanceRouter);
app.use('/updatememberattendance', updateMemberAttendanceRouter);
app.use('/getmemberattendance', getMemberAttendanceRouter);

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
