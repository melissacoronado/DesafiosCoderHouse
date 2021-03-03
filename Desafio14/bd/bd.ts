import { json } from "express";

export interface IProd{  
    //Propiedades
    id?: number  
    title:string
    price:number
    thumbnail:string
}

interface IProducto{  
    //Propiedades
    productos:IProd[]
    //Metodos
    addProduct(producto: IProd): void;
    showProducts(): void;
    updateProducts(idProd: number, title:string, price:number, thumbnail:string): void;
    deleteProduct(idProd: number):void
}

export class Producto implements  IProducto{
    productos:IProd[] = []


    addProduct(producto: IProd) {
        try{
            if (this.productos.length == 0){
                producto.id = 1
            }else{
                let ultIdProd:any = this.productos[this.productos.length - 1]!.id;
                producto.id = ultIdProd + 1; 
            }           
            
            this.productos.push(producto) 
        }catch(error){
            throw error
        }
    }

    showProducts() {
        return this.productos;
    }

    updateProducts(idProd: number, title:string, price:number, thumbnail:string): void{
        try{
            const productSelecc =  this.productos.find(x => x.id === idProd)        

            productSelecc!.title = title
            productSelecc!.price = price // -- !validar null o undefined 
            productSelecc!.thumbnail = thumbnail	
        }catch(error){
            throw error
        }
    }

    deleteProduct(idProd: number){
        try{
            this.productos = this.productos.splice(idProd, 1);
            //o psProd.productos = psProd.productos.filter(x => x.id !== id);
        }catch(error){
            throw error
        }
    }
}