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
    
    async getAll() {
        throw new CustomError(500, 'falta implementar getAll!', '')
    }
    
    addProduct = async (producto: IProd) => {
        throw new CustomError(500, 'falta implementar addProduct!','')
    }

    showProducts = async () => {
        try{
            throw new CustomError(500, 'falta implementar showProducts!','')
        }catch(error){
            throw error
        }
    }

    showProductById = async (idProd: string) => {
        throw new CustomError(500, 'falta implementar showProductById!','')
    }

    updateProducts = async (idProd: string, nombre:string, descripcion: string, codigo: number, foto:string, precio:number, stock:number) => {
        throw new CustomError(500, 'falta implementar updateProducts!','')
    }

    deleteProduct = async (idProd: string) => {
        throw new CustomError(500, 'falta implementar deleteProduct!','')
    }    
}