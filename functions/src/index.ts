import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';

admin.initializeApp(functions.config().firebase);

var createError = require('http-errors');

var reportsRouter = require('./routes/reports');
var samplesRouter = require('./routes/samples');
var cors = require('cors');
var path = require('path');

const app=express();
const main=express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/reports', reportsRouter);
app.use('/samples', samplesRouter);

// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: any) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

main.use('/',app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

export const reportFinder=functions.region('australia-southeast1').https.onRequest(main);
