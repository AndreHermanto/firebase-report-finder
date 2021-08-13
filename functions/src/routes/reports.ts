var express = require('express');
var router = express.Router();
import * as jwt from 'jsonwebtoken';
var fs = require('fs');
var cert = fs.readFileSync(__dirname + '/../nonTS/keys/singleton-app.pem');
import * as admin from 'firebase-admin';

const bucket = admin.storage().bucket();

function authenticateToken(req: any, res: any, next: any) {
	// Gather the jwt access token from the request header
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

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
		const readStream = bucket.file(`${req.params.report}.report.html`).createReadStream().on('error', function(err: NodeJS.ErrnoException) {
			res.sendStatus(err.code);
		});
		readStream.pipe(res).on('error', function(err: NodeJS.ErrnoException) {
			res.sendStatus(err.code);
		});
});

module.exports = router;
