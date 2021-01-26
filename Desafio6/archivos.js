const fs = require('fs');
const path = require('path'); 

class Archivo{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    leer() {
        try{
            fs.stat(path.resolve(__dirname, this.nombreArchivo), (error, stats) => { 
                if (error) { 
                  console.log({}); 
                } 
                else {                 
                    //console.log(stats);
                    fs.readFile(path.resolve(__dirname, this.nombreArchivo), 'utf8', (err, content) => {
                        if(err) return console.error(err); 
                        
                        //var obj = JSON.stringify(content);
                        //var test = JSON.parse(obj);
                        var obj = JSON.parse(content);
                        var keyArray = Object.keys(obj); // key1
                        console.log(obj[(keyArray[0])]); // value
                        //console.log(obj[0].title);
                    });
                  // Using methods of the Stats object 
                  //console.log("Path is file:", stats.isFile()); 
                  //console.log("Path is directory:", stats.isDirectory()); 
                } 
            }); 
        }catch(err){
            console.error(err);
        }
    }

    guardar() {
        return `Archivo: ${this.nombreArchivo}.`;
    }

    borrar() {
        return `Archivo: ${this.nombreArchivo}.`;
    }
}

let prueba = new Archivo("productos.txt");
prueba.leer(); 