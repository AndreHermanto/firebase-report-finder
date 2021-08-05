var express = require('express');
var router = express.Router();
var path = require('path');
import * as jwt from 'jsonwebtoken';
var fs = require('fs');
var cert = fs.readFileSync(__dirname + '/../nonTS/singleton-app.pem');

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

/* GET home page. */
router.get('/:report', authenticateToken, function(req: any, res: any, next: any) {
    var staticFilesPath = path.join(__dirname, '../nonTS/reports')
    res.sendFile(`${staticFilesPath}/${req.params.report}.report.html`)
});

module.exports = router;
