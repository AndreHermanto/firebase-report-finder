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

const demoModule = require('./mockdata')
const express = require('express');
const availableReports = require('./data/available-reports')
const router = express.Router();
import * as jwt from 'jsonwebtoken';
const fs = require('fs');

const cert = fs.readFileSync(__dirname + '/../nonTS/keys/singleton-app.pem');

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
 * @api {post} /samples Request Samples
 * @apiName GetSamples
 * @apiGroup Samples
 * @apiError NotFound The <code>404</code> of the Report was not found.
 * @apiError Forbidden The <code>403</code> of the token was not valid.
 * 
 * @apiHeader (Header) {String} Authorization Authorization value.
 *
 * @apiParam {String} first_name Sample first name.
 * @apiParam {String} last_name Sample last name.
 * @apiParam {String} dob Sample date of birth(ex. '30/12/2000').
 * @apiParam {String} report Report type.
 *
 * @apiSuccess {HTML} HTML HTML report
 * 
 */
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

/**
 * @api {post} /samples/byIds Request Samples
 * @apiName GetSamplesByIds
 * @apiGroup Samples
 * @apiError NotFound The <code>404</code> of the Report was not found.
 * @apiError Forbidden The <code>403</code> of the token was not valid.
 * 
 * @apiHeader (Header) {String} Authorization Authorization value.
 *
 * @apiParam {String} id Sample ids. Separated by comma if there's multiple.
 * @apiParam {String} report Report type.
 *
 * @apiSuccess {HTML} HTML HTML report
 * 
 */
router.post('/by-ids', authenticateToken, function(req: any, res: any, next: any) {
    const id = req.body.id;
    const report = req.body.report;

    const arrIds = id.split(",").map(function(item:string) {
        return item.trim();
      });
    res.send(demoModule.demo.filter((s:any) => {
        return (arrIds.map((e:string) => e.toUpperCase()).includes(s.id.toUpperCase()) && availableReports.MAPPING_AVAILABLE_REPORTS[report].includes(s.id));
      }).map(((e:any) => {
        return {id: e.id};
    })))
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