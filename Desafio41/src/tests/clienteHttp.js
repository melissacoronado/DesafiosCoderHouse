const http = require('http');

const req = http.request('http://localhost:8080/api/productos/', (error, res, body) => {
  
    console.log(`error ${error}`);
    console.log(`status code ${res ? res.statusCode : '???'}`);
    console.log(`body ${JSON.parse(body)}`);

  });

