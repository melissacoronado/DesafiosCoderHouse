export interface IProd{  
    //Propiedades
    id?: number  
    title:string
    price:number
    thumbnail:string
}

export default class persistenciaMemory {
    productos: IProd[]
    constructor() {
        this.productos = []
    }
    obtenerPersonas = async () => {
        return this.productos
    }
    agregarPersona = async (producto: IProd) => {
        this.productos.push(producto)
    }
}