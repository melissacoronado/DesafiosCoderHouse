
var http = require('http');
let puerto = process.env.port || 8000;

var server = http.createServer((req, res)=>{
    let nroAleatorio = Math.round(Math.random() * (10 - 0) + 0);

    let retorno = JSON.stringify({
        id: nroAleatorio, 
        title: "Producto " + nroAleatorio, 
        price: +(Math.round((Math.random() * ( 9999.99 - 0) + 0) + "e+2")  + "e-2"), 
        thumbnail: "Foto " + nroAleatorio
    });


    res.end(retorno);
})

server.listen(puerto, function(){
    console.log(`Server listening on ${this.address().port}`);
})