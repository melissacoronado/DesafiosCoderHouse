'use strict';

let args = require('minimist')(process.argv.slice(2)) || 8080;

console.log(args);

console.log(args.p);

console.log(args.e);

if(args.e === "dev"){
    require ('custom-env').env('development')
    console.log(process.env.TIPOPERSISTENCIA)
}else{
    require ('custom-env').env('production')
    console.log(process.env.TIPOPERSISTENCIA)
}

//me tira error
//No env file present for the current environment:  development
// Falling back to .env config