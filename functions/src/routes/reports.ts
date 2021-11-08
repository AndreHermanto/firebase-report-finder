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

const express = require('express');
const router = express.Router();
import * as jwt from 'jsonwebtoken';
const fs = require('fs');
const cert = fs.readFileSync(__dirname + '/../nonTS/keys/singleton-app.pem');
import * as admin from 'firebase-admin';
const custodianApi = require('../api/custodian'); 

const bucket = admin.storage().bucket();

function authenticateToken(req: any, res: any, next: any) {
	// Gather the jwt access token from the request header
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401) // if there isn't any token

	jwt.verify(token.toString(), cert, (err: any, user: any) => {
	  if (err) return res.sendStatus(403)
	  req.user = user
	  next() // pass the execution off to whatever request the client intended
	})
  }

/**
 * @api {get} /reports/:id Request User information
 * @apiName GetReport
 * @apiGroup Report
 * @apiError NotFound The <code>404</code> of the Report was not found.
 * @apiError Forbidden The <code>403</code> of the token was not valid.
 * 
 * @apiHeader (Header) {String} Authorization Authorization value.
 *
 * @apiSuccess {HTML} HTML HTML report
 * 
 */
router.get('/:report', authenticateToken, function(req: any, res: any, next: any) {
		const authHeader = req.headers['authorization']
		const token = authHeader && authHeader.split(' ')[1]
		custodianApi.getMappingsById(token, 'AC0057').then((e:any) => {
			console.log(e);
		})
		const readStream = bucket.file(`pharmcat/mgrb/${req.params.report}.report.html`).createReadStream().on('error', function(err: NodeJS.ErrnoException) {
			res.sendStatus(err.code);
		});
		readStream.pipe(res).on('error', function(err: NodeJS.ErrnoException) {
			res.sendStatus(err.code);
		});
});

module.exports = router;
