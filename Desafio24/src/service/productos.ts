import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

import {productosModel} from '../models/productos'
import {getProds} from '../mocks/productos.mock';

export interface IProd{  
    //Propiedades
    id?: number 
    timestamp: Date 
    nombre:string
    descripcion: string
    codigo: number
    foto:string
    precio:number
    stock:number    
}

interface IProducto{  
    //Propiedades
    productos:IProd[]
    //rutaArchivo: string
    //Metodos
    addProduct(producto: IProd): void;
    showProducts(): void;
    updateProducts(idProd: string, nombre:string, descripcion: string, codigo: number, foto:string, precio:number, stock:number): void;
    deleteProduct(idProd: string):void;
    generateProducts(cant: number): void;
}

export class Producto implements  IProducto{
    productos:IProd[] = []
    
    addProduct = async (producto: IProd) => {
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

    showProducts = async () => {
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

    updateProducts = async (idProd: string, nombre:string, descripcion: string, codigo: number, foto:string, precio:number, stock:number) => {
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

    deleteProduct = async (idProd: string) => {
        try{
            await productosModel.deleteOne({_id: idProd});
            console.log("Producto Eliminado")

        }catch(error){
            throw error
        }
    }

    generateProducts = (cant: number) => {
        let productosMock = [];
        for(let i=0; i<cant; i++){
            let productomock = getProds();
            productosMock.push(productomock);
        }
        return  productosMock; 
    }
}