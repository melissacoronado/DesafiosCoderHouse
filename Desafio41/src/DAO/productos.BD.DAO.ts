import { IProd, Producto } from "./productos.DAO"
import {productosModel} from '../models/productos'

class ProductosDbDao extends Producto {
    productos:IProd[] = []
    
    async showProducts() {
        try{
            return await productosModel.find({})
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

        }catch(error){
            throw error
        }
    }

    async addProduct (producto: IProd) {
        try{            
            const Msg = new productosModel(producto)
            await Msg.save()
            .then(() => console.log("Producto Guardado"))
            .catch( (err: any) => console.log(err));

        }catch(error){            
            console.error(error)
            throw error
        }
    }

    async showProductById (idProd: string) {
        try{
            return await productosModel.findOne({_id: idProd}).exec();
         }catch(error){
             throw error
         }
    }

    async updateProducts (idProd: string, nombre:string, descripcion: string, codigo: number, foto:string, precio:number, stock:number) {
        try{
            await productosModel.updateOne({_id: idProd}, { $set:{
                timestamp: new Date(Date.now()),
                nombre: nombre,
                descripcion: descripcion,
                codigo: codigo,
                foto: foto,
                precio: precio,
                stock: stock
                }
            })
            .then(() => console.log("Producto Actualizado"))
            .catch( (err: any) => console.log(err));

        }catch(error){
            throw error
        }
    }

    async deleteProduct (idProd: string) {
        try{
            await productosModel.deleteOne({_id: idProd});
            console.log("Producto Eliminado")

        }catch(error){
            throw error
        }
    }  
   
}
export default ProductosDbDao