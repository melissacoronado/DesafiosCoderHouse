import { json } from "express";
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./mensajes.db.sqlite"
    },
    useNullAsDefault: false
  })

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


    async addProduct(producto: IProd) {
        try{
            /*if (this.productos.length == 0){
                producto.id = 1
            }else{
                let ultIdProd:any = this.productos[this.productos.length - 1]!.id;
                producto.id = ultIdProd + 1; 
            }  */ 
            
            await knex('productos')
              .insert({ title: producto.title,
                        price: producto.price,
                        thumbnail: producto.thumbnail })
            
            //this.productos.push(producto) 
        }catch(error){
            throw error
        }
    }

    async showProducts() {
        try{
            const data = await knex.select('*')
                                .from('productos')
                                .then((rows: any) => {
                                //console.log(rows.length)
                                    if(rows.length > 0){
                                        this.productos = rows.map((val: any) => <IProd>{
                                            title: val.title,
                                            price: val.price,
                                            thumbnail: val.thumbnail
                                        });
                                    }                
                                })
                                .catch((error: any) => console.log(error));
            return this.productos;
        }catch(error){
            throw error
        }
    }

    async updateProducts(idProd: number, title:string, price:number, thumbnail:string){
        try{
            //await this.showProducts();
            //const productSelecc =  this.productos.find(x => x.id === idProd) 

            await knex('productos')
                .where('id', '=', idProd)
                .update({
                    title: title,
                    price: price,
                    thumbnail: thumbnail
                })                
/*
            productSelecc!.title = title
            productSelecc!.price = price // -- !validar null o undefined 
            productSelecc!.thumbnail = thumbnail	*/
        }catch(error){
            throw error
        }
    }

    async deleteProduct(idProd: number){
        try{
            await knex('productos')
                .where('id', '=', idProd)
                .del()
            //this.productos = this.productos.splice(idProd, 1);
            //o psProd.productos = psProd.productos.filter(x => x.id !== id);
        }catch(error){
            throw error
        }
    }
}