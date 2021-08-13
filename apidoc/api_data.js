define({ "api": [
  {
    "type": "get",
    "url": "/reports/:id",
    "title": "Request User information",
    "name": "GetReport",
    "group": "Report",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The <code>404</code> of the Report was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>The <code>403</code> of the token was not valid.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "HTML",
            "optional": false,
            "field": "HTML",
            "description": "<p>HTML report</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "functions/src/routes/reports.ts",
    "groupTitle": "Report",
    "sampleRequest": [
      {
        "url": "https://australia-southeast1-pharmcat-report-finder.cloudfunctions.net/reportFinder/reports/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/samples",
    "title": "Request Samples",
    "name": "GetSamples",
    "group": "Samples",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The <code>404</code> of the Report was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>The <code>403</code> of the token was not valid.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>Sample first name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Sample last name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>Sample date of birth(ex. '30/12/2000').</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "report",
            "description": "<p>Report type.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "HTML",
            "optional": false,
            "field": "HTML",
            "description": "<p>HTML report</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "functions/src/routes/samples.ts",
    "groupTitle": "Samples",
    "sampleRequest": [
      {
        "url": "https://australia-southeast1-pharmcat-report-finder.cloudfunctions.net/reportFinder/samples"
      }
    ]
  },
  {
    "type": "post",
    "url": "/samples/families",
    "title": "Request Sample Families",
    "name": "GetSamples",
    "group": "Samples",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The <code>404</code> of the Report was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>The <code>403</code> of the token was not valid.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "familyId",
            "description": "<p>Sample family id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Sample report type.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "HTML",
            "optional": false,
            "field": "HTML",
            "description": "<p>HTML report</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "functions/src/routes/samples.ts",
    "groupTitle": "Samples",
    "sampleRequest": [
      {
        "url": "https://australia-southeast1-pharmcat-report-finder.cloudfunctions.net/reportFinder/samples/families"
      }
    ]
  }
] });
