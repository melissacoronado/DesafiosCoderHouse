const fs = require('fs');
const path = require('path'); 

class Archivo{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }
      
    async leer() {
      try {        
        const data = await fs.promises.readFile(path.resolve(__dirname, this.nombreArchivo), { encoding: 'utf8' })
        return data;
      } catch (error) {
        return [];
      }
    }

    async guardar(File, titulo, precio, foto) {
      try {    
        
        let arrFile = JSON.parse(File); 
        console.log(arrFile)
        let nuevoProducto = JSON.stringify({ 
                           title: titulo,
                           price: precio,
                           thumbnail: foto,
                           id : arrFile.length + 1
                         });
        
        const data = await fs.promises.appendFile(path.resolve(__dirname, this.nombreArchivo), nuevoProducto)
        console.log("Archivo Guardado")
      } catch (error) {
        console.error("No se puedo Guardar el archivo")
        console.error(error)
      }
    }

    borrar() {
        return `Archivo: ${this.nombreArchivo}.`;
    }
}

let prueba = new Archivo("productos.txt");
let archivo;

(async () => {
  archivo = await prueba.leer();
  console.log(archivo)
  
  await prueba.guardar(archivo, "Mi producto",50,"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png" );
  
})()




