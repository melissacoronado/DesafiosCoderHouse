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
}

export class Producto implements  IProducto{
    productos:IProd[] = []


    addProduct(producto: IProd) {
        producto.id = this.productos.length + 1
        //this.productos = [...this.productos, producto] 
        this.productos.push(producto) 
    }

    showProducts() {
        return this.productos;
    }
}