var demoModule = require('./mockdata')
var express = require('express');
var availableReports = require('./data/available-reports')
var router = express.Router();
import * as jwt from 'jsonwebtoken';
var fs = require('fs');

var cert = fs.readFileSync(__dirname + '/../nonTS/keys/singleton-app.pem');

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
 * @api {post} /samples Request Samples
 * @apiName GetSamples
 * @apiGroup Samples
 * @apiError NotFound The <code>404</code> of the Report was not found.
 * @apiError Forbidden The <code>403</code> of the token was not valid.
 * 
 * @apiHeader (Header) {String} Authorization Authorization value.
 *
 * @apiParam {String} id Sample ids. Separated by comma if there's multiple.
 * @apiParam {String} first_name Sample first name.
 * @apiParam {String} last_name Sample last name.
 * @apiParam {String} dob Sample date of birth(ex. '30/12/2000').
 * @apiParam {String} report Report type.
 *
 * @apiSuccess {HTML} HTML HTML report
 * 
 */
router.post('/', authenticateToken, function(req: any, res: any, next: any) {
    const id = req.body.id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const dob = req.body.dob;
    const report = req.body.report;

    const arrIds = id.split(",").map(function(item:string) {
        return item.trim();
      });
    res.send(demoModule.demo.filter((s:any) => {
        if(id !== ''){
            return arrIds.includes(s.id);
        }else{
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
        }
      }))
});

/**
 * @api {post} /samples/families Request Sample Families
 * @apiName GetSamples
 * @apiGroup Samples
 * @apiError NotFound The <code>404</code> of the Report was not found.
 * @apiError Forbidden The <code>403</code> of the token was not valid.
 * 
 * @apiHeader (Header) {String} Authorization Authorization value.
 *
 * @apiParam {String} familyId Sample family id.
 * @apiParam {String} id Sample report type.
 *
 * @apiSuccess {HTML} HTML HTML report
 * 
 */
router.post('/families', authenticateToken, function(req: any, res: any, next: any) {
    const familyId = req.body.familyId;
    const report = req.body.report;
    res.send(demoModule.demo.filter((s:any) => {
        return s.familyId === familyId && availableReports.MAPPING_AVAILABLE_REPORTS[report].includes(s.id);
      }))
});

module.exports = router;