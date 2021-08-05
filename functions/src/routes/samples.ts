var demoModule = require('./mockdata')
var express = require('express');
var availableReports = require('./data/available-reports')
var router = express.Router();
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

router.post('/', authenticateToken, function(req: any, res: any, next: any) {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const dob = req.body.dob;
    const report = req.body.report;
    res.send(demoModule.demo.filter((s:any) => {
        let flag = false;
        if(
          (first_name ==='' || s.first_name.toLowerCase().includes(first_name.toLowerCase())) 
              && (last_name ==='' || s.last_name.toLowerCase().includes(last_name.toLowerCase()))
              && (dob ==='' || dob === s.dob)
              && (availableReports.MAPPING_AVAILABLE_REPORTS[report].includes(s.id))
          ){
              flag = true;
            }
        return flag;
      }))
});

router.post('/families', authenticateToken, function(req: any, res: any, next: any) {
    const familyId = req.body.familyId;
    const report = req.body.report;
    res.send(demoModule.demo.filter((s:any) => {
        return s.familyId === familyId && availableReports.MAPPING_AVAILABLE_REPORTS[report].includes(s.id);
      }))
});

module.exports = router;