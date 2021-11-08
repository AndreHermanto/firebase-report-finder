// The MIT License

// Copyright (c) 2021 Garvan, Andre Hermanto

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

const serviceAccount = require('./nonTS/keys/key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'report-finder-325309.appspot.com'
});

const createError = require('http-errors');

const reportsRouter = require('./routes/reports');
const samplesRouter = require('./routes/samples');
const cors = require('cors');
const path = require('path');

const app=express();
const main=express();

const whitelist = ['http://localhost:3000',
                  'https://report-finder-325309.web.app'
              ]

const corsOptions = {
  origin: function (origin:any, callback:any) {
    if (typeof origin === 'undefined' || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

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
main.use(express.json());
main.use(express.urlencoded({extended: true}));

export const reportFinder=functions
                            .runWith({
                              timeoutSeconds: 20,
                              memory: '128MB',
                              maxInstances: 3
                            }).https.onRequest(main);
