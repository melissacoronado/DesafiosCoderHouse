import CustomError from '../helper/CustomError.js'

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

export class Producto {
    
    async showProducts() {
        throw new CustomError(500, 'falta implementar getAll!', '')
    }
    
    async addProduct (producto: IProd) {
        throw new CustomError(500, 'falta implementar addProduct!','')
    }

    async showProductById (idProd: string) {
        throw new CustomError(500, 'falta implementar showProducts!','')
    }

    async updateProducts (idProd: string, nombre:string, descripcion: string, codigo: number, foto:string, precio:number, stock:number) {
        throw new CustomError(500, 'falta implementar updateProducts!','')
    }

    async deleteProduct (idProd: string) {
        throw new CustomError(500, 'falta implementar deleteProduct!','')
    }    
}