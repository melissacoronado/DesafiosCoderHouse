export interface Producto{    
    title:string
    price:number
    thumbnail:string
}

export class Operaciones {//implements  Producto{
    //title: string = "";
    //price: number = 0;
    //thumbnail: string = "";

    private productos:Producto[] = [];

    constructor(tit: string, price: number, thum: string){
        //this.title = tit;
        //this.price = price;    
        //this.thumbnail = thum; 
        let newProduct:Producto = {
            title: tit,
            price: price,
            thumbnail: thum
        }
        this.productos = [...this.productos, newProduct] 
    }

    public addProduct(Producto: Producto) {
        this.productos = [...this.productos, Producto] 
    }

    public showProducts() {
        return this.productos;
    }
}

 