let request = require("request");

let url = 'http://10.214.132.37:4000';

module.exports ={
  getMappingsByCohortAndId: function(token: string, cohort: string, id: string){
    let options = { method: 'GET',
      url: `${url}/mappings/${cohort}?ids=${id}`,
      headers: { 
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    }

    return new Promise (function(resolve, reject){
      request(options, function (error:any, response:any, body:any) {
        if(error) reject(error);
        try {
          resolve(body);
        }catch(e){
          reject(e);
        }
      }
    )});
  },
  getMappingsById: function(token: string, id: string){
    let options = { method: 'GET',
      url: `${url}/mappings/individual?ids=${id}`,
      headers: { 
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    }

    return new Promise (function(resolve, reject){
      request(options, function (error:any, response:any, body:any) {
        if(error) reject(error);
        try {
          resolve(body);
        }catch(e){
          reject(e);
        }
      }
    )});
  },
  getMappingsByCohort: function(token: string, cohort: string){
    let options = { method: 'GET',
      url: `${url}/mappings/${cohort}`,
      headers: { 
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    }

    return new Promise (function(resolve, reject){
      request(options, function (error:any, response:any, body:any) {
        if(error) reject(error);
        try {
          resolve(body);
        }catch(e){
          reject(e);
        }
      }
    )});
  },
} 