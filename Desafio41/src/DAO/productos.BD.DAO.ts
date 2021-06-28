import { IProd, Producto } from "./productos.DAO"
import {productosModel} from '../models/productos'

class ProductosDbDao extends Producto {
    productos:IProd[] = []
    
    async getAll() {
        try{

            await productosModel.find({})
                    .then( (productos: any) => {
                      if(productos.length > 0){
                        this.productos = productos.map((val: any) => <IProd>{
                            id: val.id, 
                            timestamp: val.created_at, 
                            nombre:val.nombre,
                            descripcion: val.descripcion,
                            codigo: val.codigo,
                            foto: val.foto,
                            precio: val.precio,
                            stock: val.stock
                        });
                      } 
                    })
                    .catch( (error: any) => console.log(error));
                         
            return  this.productos; 
        }catch(error){
            throw error
        }
    }
   
}