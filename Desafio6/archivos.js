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

    async guardar(File, nuevoProducto) {
      try {         
        nuevoProducto.id = File.length + 1;

        File.push(nuevoProducto);
        
        const data = await fs.promises.writeFile(path.resolve(__dirname, this.nombreArchivo), JSON.stringify(File))
        console.log("Archivo Guardado")
      } catch (error) {
        console.error("No se pudo Guardar el archivo")
        //console.error(error)
      }
    }

    async borrar() {
        try{
          const data = await fs.promises.unlink(path.resolve(__dirname, this.nombreArchivo))
          console.log("Archivo Borrado")
        } catch (error) {
          console.error("No se pudo Eliminar el archivo")
          //console.error(error)
        }
    }
}



let FileOps = new Archivo("productos.txt");
let archivo;

let nuevoProducto = { 
  "title": "Mi producto",
  "price": 100,
  "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
};


(async () => {
  //Leer Archivo
  archivo = await FileOps.leer();
  console.log(archivo)

  //Guardar Archivo
  await FileOps.guardar(JSON.parse(archivo), nuevoProducto);
  
  //Borrar Archivo //DESCOMENTAR PARA PROBAR BORRAR
  //await FileOps.borrar();

})()
