import { IProd, Producto } from "./productos.DAO"
const fs = require('fs');
const path = require('path'); 
import DTO from '../DTO/productos'

class ProductosFileDao extends Producto {
    productos:IProd[] = []
    
    async showProducts() {
        try{
            let retorno:IProd[]=[];
            const data = await fs.promises.readFile(path.resolve(__dirname, "productos.txt"), { encoding: 'utf8' });
            return JSON.parse(data);
        }catch(error){
            throw error
        }
    }

    async addProduct (producto: IProd) {
        try{ 
            let archivo = await this.showProducts(); 
            //let File = JSON.parse(archivo);
            producto.id = archivo.length + 1;

            archivo.push(producto);
        
            const data = await fs.promises.writeFile(path.resolve(__dirname, "productos.txt"), JSON.stringify(File))
            console.log("Archivo Guardado")

        }catch(error){            
            console.error(error)
            throw error
        }
    }

    async showProductById (idProd: string) {
        try{
            let archivo = await this.showProducts(); 
            let producto = archivo.map((i: any) => JSON.parse(i)).find((c: any) => c._id === idProd);
            return producto;
            //Falta filtrar
         }catch(error){
             throw error
         }
    }

    async showProductDto (idProd: string) {
        try{
            let producto = this.showProductById(idProd);
            return DTO.productoConInfo(producto);
         }catch(error){
             throw error
         }
    }

    async updateProducts (idProd: string, nombre:string, descripcion: string, codigo: number, foto:string, precio:number, stock:number) {
        try{
           //Falta implementar 
        }catch(error){
            throw error
        }
    }

    async deleteProduct (idProd: string) {
        try{
           //Falta implementar 
        }catch(error){
            throw error
        }
    }  
   
}
export default ProductosFileDao